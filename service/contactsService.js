'use strict';

module.exports = {
  /**
   * Add user contact
   * @param userId
   * @param contactData
   * @param Models
   * @return {Promise<{}>}
   */
  addUserContact: async(userId, contactData, {Models}) => {
    const contact = await Models.Contact.create({
      ...contactData,
      userId
    });

    return contact.woTs();
  },
  /**
   * Get user contact by id
   * @param contactId
   * @param Models
   * @return {Promise<{}>}
   */
  getUserContact: async(contactId, {Models}) => {
    const contact = await Models.Contact.findByPk(contactId);

    if (!contact) {
      throw new Error(`contacts with id ${contactId} is not exist`);
    }

    return contact.woTs();
  },
  /**
   * Update user contact by id
   * @param contactId
   * @param contactData
   * @param Models
   * @return {Promise<{}>}
   */
  updateUserContact: async(contactId, contactData, {Models}) => {
    const contact = await Models.Contact.findByPk(contactId);

    if (!contact) {
      throw new Error(`contacts with id ${contactId} is not exist`);
    }

    await contact.update(contactData, {
      fields: ['type', 'value']
    });

    return contact.woTs();
  },
  /**
   * Delete user contact by id
   * @param contactId
   * @param Models
   * @return {Promise<{}>}
   */
  deleteUserContact: async(contactId, {Models}) => {
    const contact = await Models.Contact.findByPk(contactId);

    if (!contact) {
      throw new Error(`contacts with id ${contactId} is not exist`);
    }

    await contact.destroy();

    return contact.woTs();
  },
  /**
   * Set user contacts
   * @param userId
   * @param userContacts
   * @param Models
   * @return {Promise<{}[]>}
   */
  setUserContacts: async(userId, userContacts, {Models}) =>
    await Models.sequelize.transaction(async(transaction) => {
      await Models.Contact.destroy({
        where: {userId},
        transaction
      });

      const contacts = await Models.Contact.bulkCreate(userContacts.map((contact) => {
        return {...contact, userId};
      }), {transaction, returning: true});

      return contacts.map((item) => item.woTs());
    }),
  /**
   * Search user contacts
   * @param where
   * @param limit
   * @param offset
   * @param order
   * @param Models
   * @return {Promise<{}[]>}
   */
  searchUserContacts: async({where, limit, offset, order}, {Models}) => {
    const contacts = await Models.Contact.findAll({
      where,
      limit,
      offset,
      order
    });

    return contacts.map((item) => item.woTs());
  },
  /**
   * Delete user contacts
   * @param where
   * @param Models
   * @return {Promise<{}[]>}
   */
  deleteUserContacts: async({where}, {Models}) => {
    const res = await Models.Contact.findAll({where});

    if (!res.length) {
      throw new Error(`no records with filter ${JSON.stringify(where)}`);
    }

    await Models.Contact.destroy({where});

    return res.map((item) => item.woTs());
  },
  /**
   * Get all user contacts
   * @param userId
   * @param Models
   * @return {Promise<*>}
   */
  getUserContacts: async(userId, {Models}) => {
    const res = Models.Contact.findAll({
      where: {userId}
    });

    return res.map((item) => item.woTs());
  }
};