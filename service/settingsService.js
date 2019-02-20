'use strict';

module.exports = {
  /**
   * Create or update user setting
   * @param userId
   * @param key
   * @param value
   * @param Models
   * @return {Promise<{userId: *, key: *, value: *}>}
   */
  createUserSetting: async(userId, key, value, {Models}) => {
    await Models.Setting.upsert({
      userId,
      key,
      value
    }, {raw: true});

    return {userId, key, value};
  },
  /**
   * Set all user settings
   * @param userId
   * @param settings
   * @param Models
   * @return {Promise<*>}
   */
  setUserSettings: async(userId, settings, {Models}) =>
    await Models.sequelize.transaction(async(transaction) => {
      await Models.Setting.destroy({
        where: {userId},
        transaction
      });

      const res = await Models.Setting.bulkCreate(settings.map((item) => {
        return {...item, userId};
      }), {transaction});

      return res.map((item) => item.get());
    }),
  /**
   * Delete user setting
   * @param userId
   * @param key
   * @param Models
   * @return {Promise<Object|any>}
   */
  deleteUserSetting: async(userId, key, {Models}) => {
    const where = {userId, key};
    const setting = await Models.Setting.findOne({where});

    if (!setting) {
      throw new Error(`setting with userId = ${userId}, key = ${key} is not exist`);
    }

    await Models.Setting.destroy({where});

    return setting.get();
  },
  /**
   * Search users settings
   * @param where
   * @param limit
   * @param offset
   * @param order
   * @param Models
   * @return {Promise<Array<Model>>}
   */
  searchUserSettings: async({where, limit, offset, order}, {Models}) =>
    await Models.Setting.findAll({where, limit, offset, order, raw: true})
};