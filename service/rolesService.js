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
   * @param Models
   * @return {Promise<*>}
   */
  getRole: async(roleId, {Models}) => {
    const role = await Models.Role.findByPk(roleId);

    if (!role) {
      throw new Error(`right with id ${roleId} is missing`);
    }

    return role.get({plain: true});
  },
  /**
   * Search roles
   * @param where
   * @param limit
   * @param offset
   * @param order
   * @param Models
   */
  searchRoles: async({where, limit, offset, order}, {Models}) => {
    const roles = await Models.Role.findAll({
      limit,
      offset,
      where,
      order
    });

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
      throw new Error(`right with id ${roleId} is missing`);
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
    const cnt = await Models.Role.destroy({
      where: {id: {[Models.Sequelize.Op.eq]: roleId}}
    });

    return cnt > 0;
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
    const cnt = await Models.Right.destroy({
      where: {id: {[Models.Sequelize.Op.eq]: rightId}}
    });

    return cnt > 0;
  },
  /**
   * Set rights for role
   * @param roleId
   * @param rightsIds
   * @param Models
   * @return {Promise<(Object|any)[]>}
   */
  setRoleRights: async(roleId, rightsIds, {Models}) => {
    await Models.RoleRight.destroy({
      where: {roleId: {[Models.Sequelize.Op.eq]: roleId}}
    });

    const rolesRights = await Models.RoleRight.bulkCreate(rightsIds.map((rightId) => {
      return {roleId, rightId};
    }), {returning: true});

    return rolesRights.map((roleRight) => roleRight.get({plain: true}));
  },
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
    const cnt = await Models.RoleRight.destroy({
      where: {
        roleId: {
          [Models.Sequelize.Op.eq]: roleId
        },
        rightId: {
          [Models.Sequelize.Op.eq]: rightId
        }
      }
    });

    return cnt > 0;
  },
  /**
   * Set roles for user
   * @param userId
   * @param rolesIds
   * @param Models
   * @return {Promise<*>}
   */
  setUserRoles: async(userId, rolesIds, {Models}) => {
    await Models.UserRole.destroy({
      where: {userId: {[Models.Sequelize.Op.eq]: userId}}
    });

    const userRoles = await Models.UserRole.bulkCreate(rolesIds.map((roleId) => {
      return {userId, roleId};
    }), {returning: true});

    return userRoles.map((userRole) => userRole.get({plain: true}));
  },
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
    const cnt = await Models.UserRole.destroy({
      where: {
        userId: {
          [Models.Sequelize.Op.eq]: userId
        },
        roleId: {
          [Models.Sequelize.Op.eq]: roleId
        }
      }
    });

    return cnt > 0;
  }
};
