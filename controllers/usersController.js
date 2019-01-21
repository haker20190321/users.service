'use strict';
const User = require('../service/usersService');

module.exports = {
  /**
   * Create user
   * @param params
   * @param ext
   * @return {Promise<void>}
   */
  createUser: async({userData}, ext) => await User.createUser(userData.value, ext),
  /**
   * Update user
   * @param params
   * @param ext
   */
  updateUser: async({userId, userData}, ext) =>
    await User.updateUser(userId.value, userData.value, ext),
  /**
   * Get user by id
   * @param params
   * @param ext
   */
  getUser: async({userId}, ext) => await User.getUser(userId.value, ext),
  /**
   * Delete user by id
   * @param params
   * @param ext
   */
  deleteUser: async({userId}, ext) => await User.deleteUser(userId.value, ext),
  /**
   * Search users
   * @param params
   * @param ext
   * @return {Promise<void>}
   */
  searchUsers: async({searchParams}, ext) => {
    const {value: params} = searchParams;
    return await User.searchUsers(params, ext);
  }
};