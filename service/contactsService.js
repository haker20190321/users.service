'use strict';

module.exports = {
  /**
   * Add user contact
   * @param contactData
   * @param Models
   * @return {Promise<{}>}
   */
  addUserContact: async(contactData, {Models}) => {
    const contact = await Models.Contact.create(contactData);

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
        contact.userId = userId;

        return contact;
      }, {transaction}));

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
  }
};