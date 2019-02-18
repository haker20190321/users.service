'use strict';

const rolesService = require('../service/rolesService');

module.exports = {
  createRole: async({roleData}, ext, writeError) => {
    try {
      return await rolesService.createRole(roleData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  getRole: async({roleId, appends}, ext, writeError) => {
    try {
      return await rolesService.getRole(roleId.value, appends.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  searchRoles: async({searchParams, appends}, ext, writeError) => {
    try {
      return await rolesService.searchRoles(searchParams.value, appends.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  updateRole: async({roleId, roleData}, ext, writeError) => {
    try {
      return await rolesService.updateRole(roleId.value, roleData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  deleteRole: async({roleId}, ext, writeError) => {
    try {
      return await rolesService.deleteRole(roleId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  createRight: async({rightData}, ext, writeError) => {
    try {
      return await rolesService.createRight(rightData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  getRight: async({rightId}, ext, writeError) => {
    try {
      return await rolesService.getRight(rightId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  searchRights: async({searchParams}, ext, writeError) => {
    try {
      return await rolesService.searchRights(searchParams.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  updateRight: async({rightId, rightData}, ext, writeError) => {
    try {
      return await rolesService.updateRight(rightId.value, rightData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  deleteRight: async({rightId}, ext, writeError) => {
    try {
      return await rolesService.deleteRight(rightId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  setRoleRights: async({roleId, rightsIds}, ext, writeError) => {
    try {
      return await rolesService.setRoleRights(roleId.value, rightsIds.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  addRoleRight: async({roleId, rightId}, ext, writeError) => {
    try {
      return await rolesService.addRoleRight(roleId.value, rightId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  deleteRoleRight: async({roleId, rightId}, ext, writeError) => {
    try {
      return await rolesService.deleteRoleRight(roleId.value, rightId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  setUserRoles: async({userId, rolesIds}, ext, writeError) => {
    try {
      return await rolesService.setUserRoles(userId.value, rolesIds.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  addUserRole: async({userId, roleId}, ext, writeError) => {
    try {
      return await rolesService.addUserRole(userId.value, roleId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  deleteUserRole: async({userId, roleId}, ext, writeError) => {
    try {
      return await rolesService.deleteUserRole(userId.value, roleId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  getRoleRights: async({roleId}, ext, writeError) => {
    try {
      return await rolesService.getRoleRights(roleId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  getUserRoles: async({userId}, ext, writeError) => {
    try {
      return await rolesService.getUserRoles(userId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  }
};