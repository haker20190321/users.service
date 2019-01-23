'use strict';
const User = require('../service/usersService');

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
      return await User.createUser(userData.value, ext);
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
      return await User.updateUser(userId.value, userData.value, ext);
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
      return await User.getUser(userId.value, ext);
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
      return await User.deleteUser(userId.value, ext);
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
      return await User.searchUsers(searchParams.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  }
};