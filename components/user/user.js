module.exports = {
  /**
   * Create client
   *
   * @param {Object} userData
   * @return {Object}
   */
  create: (userData) => {
    // todo validate params
    // todo create account in oauth2
    // todo create user
    // todo return userData + userId + accountId
    if (!userData || !userData.name || userData.name.length <= 2) {
      throw new Error('the number of characters in the name must be greater than 2');
    }

    const nextId = users.length +1;
    const nextAccountId = users.length +1;
    const user = {...userData, id: nextId, accountId: nextAccountId};

    users.push(user);

    return user;
  },
  /**
   * Update user by id
   *
   * @param {Number} userId - user id
   * @param {Object} userData - user date
   * @returns {Object} - updated user
   * @throws {Error}
   */
  update: (userId, userData) => {
    // todo validate params
    // todo update user by id
    // todo return updated user data
    let user = users.find(item => item.id === userId);

    if (!user) {
      throw new Error(`user with id ${userId} is missing`)
    }

    user = {...user, ...userData};

    return user;
  },
  /**
   * Get user by user id
   *
   * @param {Number} userId
   * @return {Object}
   * @throws {Error}
   */
  getByUserId: (userId) => {
    // todo get user from db
    // todo return user data
    const user = users.find(item => item.id === userId);

    if (!user) {
      throw new Error(`user with id ${userId} is missing`)
    }

    return user;
  },
  /**
   * Get user by oauth2 account id
   * @param {Number} accountId
   * @return {Object}
   * @throws {Error}
   */
  getByAccountId: (accountId) => {
    // todo get user from db by account id
    // todo return user data
    const user = users.find(item => item.accountId === accountId);

    if (!user) {
      throw new Error(`user with id ${accountId} is missing`)
    }

    return user;
  },
  /**
   * Delete user by user id
   *
   * @param {Number} userId
   * @returns {boolean}
   */
  deleteByUserId: (userId) => {
    const len = users.length;

    users = users.filter(item => item.id !== userId);

    return users.length < len;
  }
  ,
  deleteByAccountId: (accountId) => {
    const len = users.length;

    users = users.filter(item => item.accountId !== accountId);

    return users.length < len;
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