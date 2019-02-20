const assert = require('chai').assert;
const {createUser} = require('../service/usersService');
const {makeUser} = require('./helper');
const {AuthSuccess} = require('./mockOAuth');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');
const errorLog = console.warn;

const Models = require('../db/models');
const settingsController = require('../controllers/settingsController');
const ext = {Models};

const settingsFields = ['userId', 'key', 'value'];

describe('settingsController test', function () {

  let user = {};

  it('should init', async function () {
    const userData = await makeUser();

    user = await createUser(userData, {Models, OAuth: new AuthSuccess(), logger});
  });

  describe('Normal behavior', function () {

    it('should createUserSetting', async function () {
      const params = {
        settingData: {
          value: {
            userId: user.id,
            key: 'foo',
            value: 'bar'
          }
        }
      };
      const res = await settingsController.createUserSetting(params, ext, errorLog);

      assert.isObject(res);
      assert.hasAllKeys(res, settingsFields);
      assert.equal(res.userId, user.id);
      assert.equal(res.key, 'foo');
      assert.equal(res.value, 'bar');
    });

    it('should setUserSettings', async function () {
        const params = {
          userId: {
            value: user.id
          },
          settings: {
            value: [
              {key: 'foo', value: 'bar'},
              {key: 'baz', value: 'ebobo'},
              {key: 'chi', value: 'da'}
            ]
          }
        };

        const res = await settingsController.setUserSettings(params, ext, errorLog);

        assert.isArray(res);
        assert.isNotEmpty(res);
        assert.lengthOf(res, 3);
        res.forEach(item => assert.hasAllKeys(item, settingsFields));
    });

    it('should searchUserSettings', async function () {
      const params = {
        searchParams: {
          value: {
            where: {userId: user.id}
          }
        }
      };
      const res = await settingsController.searchUserSettings(params, ext, errorLog);

      assert.isArray(res);
      assert.isNotEmpty(res);
      assert.lengthOf(res, 3);
      res.forEach(item => assert.hasAllKeys(item, settingsFields));
    });

    it('should deleteUserSetting', async function () {
        const params = {
          userId: {value: user.id},
          key: {value: 'foo'}
        };
        const res = await settingsController.deleteUserSetting(params, ext, errorLog);

        assert.isObject(res);
        assert.hasAllKeys(res, settingsFields);
        assert.equal(res.userId, user.id);
        assert.equal(res.key, 'foo');
    });

  });

  describe('Error behavior', function () {

    it('should createUserSetting', async function () {
      const params = {
        settingData: {
          value: {
            userId: 0,
            key: 'foo',
            value: 'bar'
          }
        }
      };
      const res = await settingsController.createUserSetting(params, ext, errorLog);
      assert.isUndefined(res);
    });

    it('should setUserSettings', async function () {
      const params = {
        userId: {
          value: 0
        },
        settings: {
          value: [
            {key: 'foo', value: 'bar'},
            {key: 'baz', value: 'ebobo'},
            {key: 'chi', value: 'da'}
          ]
        }
      };

      const res = await settingsController.setUserSettings(params, ext, errorLog);
      assert.isUndefined(res);
    });

    it('should searchUserSettings', async function () {
      const params = {
        searchParams: {
          value: {
            where: {badField: user.id}
          }
        }
      };
      const res = await settingsController.searchUserSettings(params, ext, errorLog);
      assert.isUndefined(res);
    });

    it('should deleteUserSetting', async function () {
      const params = {
        userId: {value: user.id},
        key: {value: 'foo'}
      };
      const res = await settingsController.deleteUserSetting(params, ext, errorLog);
      assert.isUndefined(res);
    });

  });

});