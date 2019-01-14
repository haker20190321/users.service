'use strict';
const checkAccount = require('../components/auth/checkAccount');
const createAccount = require('../components/auth/createAccount');

module.exports = {
  /**
   * Create user
   *
   * @param {Object} userData
   * @param {Object} db
   * @return {Promise<void>}
   */
  createUser: async(userData, {db}) => {
    try {
      // проверить существование аккаунта с таким логином
      let {id: accountId} = await checkAccount(userData.login, true);

      // если аккаунт существует, то ищем пользователя
      // иначе создаем аккаунт
      if (accountId) {
        const cnt = await db('users_users')
          .where('account_id', accountId)
          .count('id');
        // если находим то ошибка
        if (cnt) {
          throw new Error(`User with login ${userData.login} is exist`);
        }
      } else {
        accountId = await createAccount(userData);
      }

      // создаем пользователя
      const [user] = await db('users_users').insert({
        'account_id': accountId,
        'login': userData.login,
        'first_name': userData.first_name,
        'last_name': userData.last_name,
        'middle_name': userData.middle_name,
        'birthday': userData.birthday
      }, '*');

      // todo knex приводит дату к объекту Date
      user.birthday = user.birthday.toISOString();

      return user;
    } catch(error) {
      throw new Error(`CreateUser: ${error.message}`);
    }
  },
  /**
   * Update user by id
   *
   * @param {Number} userId - user id
   * @param {Object} userData - user date
   * @param {Object} ext
   * @returns {Object} - updated user
   * @throws {Error}
   */
  updateUser: async(userId, userData, {db}) => {
    const [user] = await db('users_users')
      .where('id', userId)
      .update(userData, '*');

    if (!user) {
      throw new Error(`user with id ${userId} is missing`);
    }

    user.id = Number(user.id);

    return user;
  },
  /**
   * Get user by user id
   *
   * @param {Number} userId
   * @param {Object} ext
   * @return {Object}
   * @throws {Error}
   */
  getUser: async(userId, {db}) => {
    const [user] = await db('users_users')
      .where('id', userId);

    if (!user) {
      throw new Error(`user with id ${userId} is missing`);
    }

    user.id = Number(user.id);

    return user;
  },
  /**
   * Delete user by user id
   *
   * @param {Number} userId
   * @param {Object} ext
   * @returns {boolean}
   */
  deleteUser: async(userId, {db}) => {
    const cnt = await db('users_users')
      .where('id', userId)
      .del();

    return cnt > 0;
  },
  /**
   * Search users
   *
   * @param params
   * @param {Object} ext
   * @return {*[]}
   */
  searchUsers: async(params, {db}) => await db('users_users')
};