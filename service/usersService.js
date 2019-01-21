'use strict';
const checkAccount = require('../components/auth/checkAccount');
const createAccount = require('../components/auth/createAccount');

module.exports = {
  /**
   * Create user
   *
   * @param {Object} userData
   * @param {Object} db
   * @param {Object} Models
   * @return {Promise<void>}
   */
  createUser: async(userData, {Models}) => {
    try {
      // проверить существование аккаунта с таким логином
      const {Op} = Models.Sequelize;
      const {login} = userData;
      let {id: accountId} = await checkAccount(login, true);

      // если аккаунт существует, то ищем пользователя
      // иначе создаем аккаунт
      if (accountId) {
        const cnt = await Models.User.count({
          where: {
            [Op.or]: [
              {accountId: {[Op.eq]: accountId}},
              {login: {[Op.eq]: login}}
            ]
          }
        });
        if (cnt) {
          throw new Error(`User with login ${userData.login} is exist`);
        }
      } else {
        const cnt = await Models.User.count({
          where: {login: {[Op.eq]: login}}
        });
        if (cnt) {
          throw new Error(`User with login ${userData.login} is exist`);
        }

        accountId = await createAccount(userData);
      }

      // создаем пользователя
      const user = await Models.User.create({
        accountId,
        ...userData
      });

      return user.get();
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
  updateUser: async(userId, userData, {Models}) => {
    const user = await Models.User.findByPk(userId);

    if (!user) {
      throw new Error(`user with id ${userId} is missing`);
    }

    await user.update(userData, {
      fields: ['firstName', 'lastName', 'middleName']
    });

    return user.get({
      plain: true
    });
  },
  /**
   * Get user by user id
   *
   * @param {Number} userId
   * @param {Object} ext
   * @return {Object}
   * @throws {Error}
   */
  getUser: async(userId, {Models}) => {
    const user = await Models.User.findByPk(userId);

    if (!user) {
      throw new Error(`user with id ${userId} is missing`);
    }

    return user.get({
      plain: true
    });
  },
  /**
   * Delete user by user id
   *
   * @param {Number} userId
   * @param {Object} ext
   * @returns {boolean}
   */
  deleteUser: async(userId, {Models}) => {
    const cnt = await Models.User.destroy({
      where: {id: {[Models.Sequelize.Op.eq]: userId}}
    });

    return cnt > 0;
  },
  /**
   * Search users
   *
   * @param params
   * @param {Object} ext
   * @return {*[]}
   */
  searchUsers: async({limit, offset, where, order}, {Models}) => {
    const users = await Models.User.findAll({
      limit,
      offset,
      where,
      order
    });

    return users.map((item) => item.get({plain: true}));
  }
};