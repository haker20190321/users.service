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
    // todo create user
    const user = {
      'account_id': accountId,
      'first_name': userData.first_name || null,
      'last_name': userData.last_name || null,
      'middle_name': userData.middle_name || null,
      'birthday': userData.birthday || null
    };

    const res = await db('users_users')
      .insert(user, '*');

    return res[0];
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
    const rows = await db('users_users')
      .where('id', userId)
      .update(userData, '*');

    return rows[0];
  },
  /**
   * Get user by user id
   *
   * @param {Number} userId
   * @return {Object}
   * @throws {Error}
   */
  getUser: (userId) => {
    // todo get user from db
    // todo return user data
    const user = users.find((item) => item.id === userId);

    if (!user) {
      throw new Error(`user with id ${userId} is missing`);
    }

    return user;
  },
  /**
   * Delete user by user id
   *
   * @param {Number} userId
   * @returns {boolean}
   */
  deleteUser: (userId) => {
    const len = users.length;

    users = users.filter((item) => item.id !== userId);

    return users.length < len;
  },
  searchUsers: (params) => {
    const {name} = params;

    if (!name) {
      throw new Error('name is missing');
    }

    return users.filter((item) => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }
};

let users = [
  {
    id: 1,
    accountId: 1,
    name: 'UserName1'
  },
  {
    id: 2,
    accountId: 2,
    name: 'UserName2'
  }
];