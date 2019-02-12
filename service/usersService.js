'use strict';

module.exports = {
  /**
   * Create user
   * @param {Object} userData
   * @param {Object} Models
   * @param {Object} OAuth
   * @param {Object} logger
   * @return {Promise<*>}
   */
  createUser: async(userData, {Models, OAuth, logger}) => {
    logger.debug('userService.createUser: init');
    // проверить существование аккаунта с таким логином
    const {Op} = Models.Sequelize;
    const {login} = userData;

    try {
      logger.debug('userService.createUser: check login in service - start');

      const cnt = await Models.User.count({
        where: {
          login: {[Op.eq]: login}
        },
        paranoid: false
      });

      logger.debug('userService.createUser: check login in service - success');

      if (cnt) {
        logger.debug(`userService.createUser: check login in service - ` +
          `login '${userData.login}' is exist`);

        throw new Error(`User with login ${userData.login} is exist in service`);
      }

      logger.debug(`userService.createUser: check login in ldap - start`);

      const exist = await OAuth.check(login, false);

      logger.debug(`userService.createUser: check login in ldap - success`);

      if (exist) {
        throw new Error(`User with login ${userData.login} is exist in ldap`);
      }

      logger.debug('userService.createUser: create account in ldap - start');

      const id = await OAuth.create(userData);

      logger.debug('userService.createUser: create account in ldap - success');

      logger.debug('userService.createUser: create user in service - start');

      const user = await Models.User.create({
        ...userData,
        id
      });

      logger.debug('userService.createUser: create user in service - success');

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
  },
  /**
   * Set user relationship
   * @param {Number} head
   * @param {Number} under
   * @param {Object} Models
   * @return {Promise<*>} inserted rows
   */
  createUserRelationship: async(head, under, {Models}) => {
    const {
      UniqueConstraintError,
      ForeignKeyConstraintError
    } = Models.Sequelize;

    try {
      const pair = await Models.UsersHierarchy.create({head, under});

      return pair.get({plain: true});
    } catch(error) {
      let {message} = error;

      /* istanbul ignore else */
      if (error instanceof UniqueConstraintError) {
        message = `Pair head = ${head}, under = ${under} already exists`;
      } else if (error instanceof ForeignKeyConstraintError) {
        message = `One or more users out of (${head}, ${under}) does not exist`;
      }

      throw new Error(message);
    }
  },
  /**
   * Update user relationships
   * @param {Object} params
   * @param {Object} where
   * @param {Object} Models
   * @return {Promise<*>} updated rows
   */
  updateUserRelationships: async(params, where, {Models}) => {
    const [cnt, res] = await Models.UsersHierarchy.update(params, {where, returning: true});

    if (!cnt) {
      throw new Error(`no records found with filter '${JSON.stringify(where)}'`);
    }

    return res.map((item) => item.get({plain: true}));
  },
  /**
   * Delete user relationship
   * @param {Number} head
   * @param {Number} under
   * @param {Object} Models
   * @return {Promise<boolean>}
   */
  deleteUserRelationship: async(head, under, {Models}) => {
    const cnt = await Models.UsersHierarchy.destroy({
      where: {head, under}
    });

    if (!cnt) {
      throw new Error(`Pair head = ${head}, under = ${under} does not exist`);
    }

    return cnt > 0;
  }
};