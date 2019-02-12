'use strict';

module.exports = {
  /**
   * Create role
   * @param roleData
   * @param Models
   * @return {Promise<*>}
   */
  createRole: async(roleData, {Models}) => {
    const role = await Models.Role.create(roleData);

    return role.get({plain: true});
  },
  /**
   * Get role by id
   * @param roleId
   * @param appends
   * @param Models
   * @return {Promise<*>}
   */
  getRole: async(roleId, appends = [], {Models}) => {
    const options = {};

    if (appends.includes('rights')) {
      options.include = [{
        model: Models.Right,
        as: 'rights',
        through: {
          attributes: []
        }
      }];
    }
    const role = await Models.Role.findByPk(roleId, options);

    if (!role) {
      throw new Error(`role with id ${roleId} is missing`);
    }

    return role.get({plain: true});
  },
  /**
   * Search roles
   * @param where
   * @param limit
   * @param offset
   * @param order
   * @param appends
   * @param Models
   */
  searchRoles: async({where, limit, offset, order}, appends = [], {Models}) => {
    const options = {
      limit,
      offset,
      where,
      order
    };

    if (appends.includes('rights')) {
      options.include = [{
        model: Models.Right,
        as: 'rights',
        through: {
          attributes: []
        }
      }];
    }

    const roles = await Models.Role.findAll(options);

    return roles.map((item) => item.get({plain: true}));
  },
  /**
   * Update role
   * @param roleId
   * @param roleData
   * @param Models
   * @return {Promise<*>}
   */
  updateRole: async(roleId, roleData, {Models}) => {
    const role = await Models.Role.findByPk(roleId);

    if (!role) {
      throw new Error(`role with id ${roleId} is missing`);
    }

    await role.update(roleData, {
      fields: ['title']
    });

    return role.get({plain: true});
  },
  /**
   * Delete role
   * @param roleId
   * @param Models
   * @return {Promise<*>}
   */
  deleteRole: async(roleId, {Models}) => {
    const role = await Models.Role.findByPk(roleId);

    if (!role) {
      throw new Error(`role with id ${roleId} is missing`);
    }

    await role.destroy();

    return role.get({plain: true});
  },
  /**
   * Create right
   * @param rightData
   * @param Models
   * @return {Promise<*>}
   */
  createRight: async(rightData, {Models}) => {
    const right = await Models.Right.create(rightData);

    return right.get({plain: true});
  },
  /**
   * Get right by id
   * @param rightId
   * @param Models
   * @return {Promise<*>}
   */
  getRight: async(rightId, {Models}) => {
    const right = await Models.Right.findByPk(rightId);

    if (!right) {
      throw new Error(`right with id ${rightId} is missing`);
    }

    return right.get({plain: true});
  },
  /**
   * Search rights
   * @param where
   * @param limit
   * @param offset
   * @param order
   * @param Models
   */
  searchRights: async({where, limit, offset, order}, {Models}) => {
    const rights = await Models.Right.findAll({
      limit,
      offset,
      where,
      order
    });

    return rights.map((item) => item.get({plain: true}));
  },
  /**
   * Update right
   * @param rightId
   * @param rightData
   * @param Models
   * @return {Promise<*>}
   */
  updateRight: async(rightId, rightData, {Models}) => {
    const right = await Models.Right.findByPk(rightId);

    if (!right) {
      throw new Error(`right with id ${rightId} is missing`);
    }

    await right.update(rightData, {
      fields: ['title']
    });

    return right.get({plain: true});
  },
  /**
   * Delete right
   * @param rightId
   * @param Models
   * @return {Promise<*>}
   */
  deleteRight: async(rightId, {Models}) => {
    const right = await Models.Right.findByPk(rightId);

    if (!right) {
      throw new Error(`right with id ${rightId} is missing`);
    }

    await right.destroy();

    return right.get({plain: true});
  },
  /**
   * Set rights for role
   * @param roleId
   * @param rightsIds
   * @param Models
   * @return {Promise<(Object|any)[]>}
   */
  setRoleRights: async(roleId, rightsIds, {Models}) =>
    await Models.sequelize.transaction(async(transaction) => {
      await Models.RoleRight.destroy({
        where: {roleId: {[Models.Sequelize.Op.eq]: roleId}}
      }, {transaction});

      const rolesRights = await Models.RoleRight.bulkCreate(rightsIds.map((rightId) => {
        return {roleId, rightId};
      }), {returning: true, transaction});

      return rolesRights.map((roleRight) => roleRight.get({plain: true}));
    }),
  /**
   * Add right for role
   * @param roleId
   * @param rightId
   * @param Models
   * @return {Promise<*>}
   */
  addRoleRight: async(roleId, rightId, {Models}) => {
    const roleRight = await Models.RoleRight.create({roleId, rightId});

    return roleRight.get({plain: true});
  },
  /**
   * Disable right for role
   * @param roleId
   * @param rightId
   * @param Models
   * @return {Promise<boolean>}
   */
  deleteRoleRight: async(roleId, rightId, {Models}) => {
    const where = {
      roleId: {
        [Models.Sequelize.Op.eq]: roleId
      },
      rightId: {
        [Models.Sequelize.Op.eq]: rightId
      }
    };
    const roleRight = await Models.RoleRight.findOne({where});

    if (!roleRight) {
      throw new Error(`pair with roleId = ${roleId}, rightId = ${rightId} is missing`);
    }

    await Models.RoleRight.destroy({where});

    return roleRight.get({plain: true});
  },
  /**
   * Set roles for user
   * @param userId
   * @param rolesIds
   * @param Models
   * @return {Promise<*>}
   */
  setUserRoles: async(userId, rolesIds, {Models}) =>
    await Models.sequelize.transaction(async(transaction) => {
      await Models.UserRole.destroy({
        where: {userId: {[Models.Sequelize.Op.eq]: userId}}
      }, {transaction});

      const userRoles = await Models.UserRole.bulkCreate(rolesIds.map((roleId) => {
        return {userId, roleId};
      }), {returning: true, transaction});

      return userRoles.map((userRole) => userRole.get({plain: true}));
    }),
  /**
   * Add role for user
   * @param userId
   * @param roleId
   * @param Models
   * @return {Promise<*>}
   */
  addUserRole: async(userId, roleId, {Models}) => {
    const userRole = await Models.UserRole.create({userId, roleId});

    return userRole.get({plain: true});
  },
  /**
   * Disable role for user
   * @param userId
   * @param roleId
   * @param Models
   * @return {Promise<*>}
   */
  deleteUserRole: async(userId, roleId, {Models}) => {
    const where = {
      userId: {
        [Models.Sequelize.Op.eq]: userId
      },
      roleId: {
        [Models.Sequelize.Op.eq]: roleId
      }
    };

    const userRole = await Models.UserRole.findOne({where});

    if (!userRole) {
      throw new Error(`pair with userId = ${userId}, roleId = ${roleId} is missing`);
    }

    await Models.UserRole.destroy({where});

    return userRole.get({plain: true});
  },
  getRoleRights: async(roleId, {Models}) => {
    const role = await Models.Role.findByPk(roleId, {
      include: [{
        model: Models.Right,
        as: 'rights',
        through: {
          attributes: []
        }
      }]
    });

    if (!role) {
      throw new Error(`role with id ${roleId} is missing`);
    }

    return role.rights.map((item) => item.get());
  },
  getUserRoles: async(userId, {Models}) => {
    const user = await Models.User.findByPk(userId, {
      include: [{
        model: Models.Role,
        as: 'roles',
        through: {
          attributes: []
        }
      }]
    });

    if (!user) {
      throw new Error(`user with id ${userId} is missing`);
    }

    return user.roles.map((item) => item.get({plain: true}));
  }
};
