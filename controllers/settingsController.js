'use strict';

const settingsService = require('../service/settingsService');

module.exports = {
  /**
   * Create user setting
   * @param userId
   * @param key
   * @param value
   * @param ext
   * @param writeError
   * @return {Promise<*>}
   */
  createUserSetting: async({settingData: {value: {userId, key, value}}}, ext, writeError) => {
    try {
      return await settingsService.createUserSetting(userId, key, value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Set all user settings
   * @param userId
   * @param settings
   * @param ext
   * @param writeError
   * @return {Promise<*>}
   */
  setUserSettings: async({userId, settings}, ext, writeError) => {
    try {
      return await settingsService.setUserSettings(userId.value, settings.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Delete user setting
   * @param userId
   * @param key
   * @param ext
   * @param writeError
   * @return {Promise<*>}
   */
  deleteUserSetting: async({userId, key}, ext, writeError) => {
    try {
      return await settingsService.deleteUserSetting(userId.value, key.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Search user settings
   * @param searchParams
   * @param ext
   * @param writeError
   * @return {Promise<*>}
   */
  searchUserSettings: async({searchParams}, ext, writeError) => {
    try {
      return await settingsService.searchUserSettings(searchParams.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  }
};