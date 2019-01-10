'use strict';

module.exports = {
  /**
   * Create client
   *
   * @param {Object} userData
   * @param {Object} ext
   * @return {Object}
   */
  createUser: async(userData, ext) => {
    const {db} = ext;

    // todo create account in oauth2
    const accountId = '38c8f916-5c75-4ea8-a629-518557e04ae0';

    delete userData.password;
    delete userData.login;

    userData['account_id'] = accountId;

    const [user] = await db('users_users')
      .insert(userData, '*');

    user.id = Number(user.id);
    user.birthday = user.birthday.toISOString();

    return user;
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
  updateUser: async(userId, userData, ext) => {
    const {db} = ext;
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
  getUser: async(userId, ext) => {
    const {db} = ext;
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
  deleteUser: async(userId, ext) => {
    const {db} = ext;
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
  searchUsers: async(params, ext) => {
    const {db} = ext;

    return await db('users_users');
  }
};