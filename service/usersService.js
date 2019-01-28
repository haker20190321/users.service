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
  createUser: async(userData, {Models, logger}) => {
    logger.debug('userService.createUser: init');
    // проверить существование аккаунта с таким логином
    const {Op} = Models.Sequelize;
    const {login} = userData;
    try {
      logger.debug('userService.createUser: checkAccount - start');

      let {id} = await checkAccount(login, true);

      logger.debug('userService.createUser: checkAccount - success');
      // если аккаунт существует, то ищем пользователя
      // иначе создаем аккаунт
      if (id) {
        logger.debug('userService.createUser: Account exist branch');

        const cnt = await Models.User.count({
          where: {
            [Op.or]: [
              {id: {[Op.eq]: id}},
              {login: {[Op.eq]: login}}
            ]
          }
        });
        logger.debug('userService.createUser: Check user by id and login success');
        if (cnt) {
          throw new Error(`User with login ${userData.login} is exist`);
        }
      } else {
        logger.debug('userService.createUser: Account missing branch');

        const cnt = await Models.User.count({
          where: {login: {[Op.eq]: login}}
        });
        logger.debug('userService.createUser: Check user by id success');
        if (cnt) {
          throw new Error(`User with login ${userData.login} is exist`);
        }

        logger.debug('userService.createUser: createAccount');
        id = await createAccount(userData);
        logger.debug('userService.createUser: createAccount success');
      }

      // создаем пользователя
      logger.debug('userService.createUser: createUser');
      const user = await Models.User.create({
        ...userData,
        id
      });
      logger.debug('userService.createUser: createUser success');

      return user.get('woTs');
    } catch(error) {
      logger.debug('userService.createUser: error catch');

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
  updateUser: async(userId, userData, {Models, logger}) => {
    logger.debug('userService.updateUser: init');
    logger.debug('userService.updateUser: find user');
    const user = await Models.User.findByPk(userId);

    logger.debug('userService.updateUser: find user success');

    if (!user) {
      logger.debug('userService.updateUser: user is missing');
      throw new Error(`user with id ${userId} is missing`);
    }

    logger.debug('userService.updateUser: update user');
    await user.update(userData, {
      fields: ['firstName', 'lastName', 'middleName', 'isActive']
    });

    logger.debug('userService.updateUser: update user success');

    return user.get('woTs');
  },
  /**
   * Get user by user id
   *
   * @param {Number} userId
   * @param {Object} ext
   * @return {Object}
   * @throws {Error}
   */
  getUser: async(userId, {Models, logger}) => {
    logger.debug('userService.getUser: init');
    logger.debug('userService.getUser: find user');

    const user = await Models.User.findByPk(userId);
    logger.debug('userService.getUser: find user success');

    if (!user) {
      logger.debug('userService.getUser: user is missing');
      throw new Error(`user with id ${userId} is missing`);
    }

    return user.get('woTs');
  },
  /**
   * Delete user by user id
   *
   * @param {Number} userId
   * @param {Object} ext
   * @returns {boolean}
   */
  deleteUser: async(userId, {Models, logger}) => {
    logger.debug('userService.deleteUser: init');
    logger.debug('userService.deleteUser: find user');
    const user = await Models.User.findByPk(userId);

    logger.debug('userService.deleteUser: find user success');

    if (!user) {
      logger.debug('userService.deleteUser: user is missing');
      throw new Error(`user with id ${userId} is missing`);
    }

    logger.debug('userService.deleteUser: destroy user');
    await user.destroy();
    logger.debug('userService.deleteUser: destroy user success');

    return true;
  },
  /**
   * Search users
   *
   * @param params
   * @param {Object} ext
   * @return {*[]}
   */
  searchUsers: async({limit, offset, where, order}, {Models, logger}) => {
    logger.debug('userService.searchUsers: init');
    logger.debug('userService.searchUsers: search users');
    const users = await Models.User.findAll({
      limit,
      offset,
      where,
      order
    });
    logger.debug('userService.searchUsers: search users success');

    return users.map((item) => item.get('woTs'));
  }
};