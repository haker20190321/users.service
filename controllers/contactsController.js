'use strict';

const contactsService = require('../service/contactsService');

module.exports = {
  /**
   * Add user contacts
   * @param userId
   * @param contactData
   * @param ext
   * @param writeError
   * @return {Promise<*>}
   */
  addUserContact: async({userId, contactData}, ext, writeError) => {
    try {
      return await contactsService.addUserContact(userId.value, contactData.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Set user contacts
   * @param userId
   * @param userContacts
   * @param ext
   * @param writeError
   * @return {Promise<*>}
   */
  setUserContacts: async({userId, userContacts}, ext, writeError) => {
    try {
      return await contactsService.setUserContacts(userId.value, userContacts.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Search user contacts
   * @param searchParams
   * @param ext
   * @param writeError
   * @return {Promise<*>}
   */
  searchUserContacts: async({searchParams}, ext, writeError) => {
    try {
      return await contactsService.searchUserContacts(searchParams.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  },
  /**
   * Delete user contacts
   * @param searchParams
   * @param ext
   * @param writeError
   * @return {Promise<*>}
   */
  deleteUserContacts: async({searchParams}, ext, writeError) => {
    try {
      return await contactsService.deleteUserContacts(searchParams.value, ext);
    } catch(error) {
      return writeError(error.message);
    }
  }
};