'use strict';
const usersService = require('../service/usersService');

module.exports = {
  /**
   * Create user
   * @param {Object} params
   * @param {Object} ext
   * @param {Function} writeError
   * @return {Promise<void>}
   */
  createUser: async({userData}, ext, writeError) => {
    try {
      return await usersService.createUser(userData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Update user
   * @param params
   * @param {Object} ext
   * @param {Function} writeError
   * @return {Promise<void>}
   */
  updateUser: async({userId, userData}, ext, writeError) => {
    try {
      return await usersService.updateUser(userId.value, userData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Get user by id
   * @param {Object} params - parameters
   * @param {Object} ext - extensions
   * @param {Function} writeError - error callback
   * @return {Promise<void>}
   */
  getUser: async({userId}, ext, writeError) => {
    try {
      return await usersService.getUser(userId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Delete user by id
   * @param {Object} params - parameters
   * @param {Object} ext - extensions
   * @param {Function} writeError - error callback
   * @return {Promise<void>}
   */
  deleteUser: async({userId}, ext, writeError) => {
    try {
      return await usersService.deleteUser(userId.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Search users
   * @param {Object} params
   * @param {Object} ext
   * @param {Function} writeError
   * @return {Promise<void>}
   */
  searchUsers: async({searchParams}, ext, writeError) => {
    try {
      return await usersService.searchUsers(searchParams.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Create users relationship
   * @param {Number} head
   * @param {Number} under
   * @param {Object} ext
   * @param {Function} writeError
   * @return {Promise<*>}
   */
  createUserRelationship: async({head, under}, ext, writeError) => {
    try {
      return await usersService.createUserRelationship(head, under, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Update users relationships
   * @param {Object} params
   * @param {Object} where
   * @param {Object} ext
   * @param {Function} writeError
   * @return {Promise<*>}
   */
  updateUserRelationships: async({params, where}, ext, writeError) => {
    try {
      return await usersService.updateUserRelationships(params, where, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Delete users relationship
   * @param {Number} head
   * @param {Number} under
   * @param {Object} ext
   * @param {Function} writeError
   * @return {Promise<*>}
   */
  deleteUserRelationship: async({head, under}, ext, writeError) => {
    try {
      return await usersService.deleteUserRelationship(head, under, ext);
    } catch(error) {
      return writeError(error);
    }
  }
};