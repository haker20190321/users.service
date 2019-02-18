const assert = require('chai').assert;

const OAuth = require('../components/oauth');
const conf = require('../config').oauth;
const oauth = new OAuth(conf);

const {makeUser} = require('./helper');


describe('Auth components test', function () {
  let userData = {};

  describe('Normal behavior', function () {

    it('should init', async function () {
      userData = await makeUser();
    });

    it('should checkAccount without data', async function () {
      const exist = await oauth.check(userData.login, false);

      assert.isBoolean(exist);
      assert.isFalse(exist);
    });

    it('should createAccount', async function () {
      const accountId = await oauth.create(userData);

      assert.isNumber(accountId);
    });

    it('should checkAccount with data after create', async function () {
      const exist = await oauth.check(userData.login, true);
      console.warn(exist);
      const {
        id,
        login,
        clients
      } = exist;

      assert.isString(id); // сервер возвращает id строкой
      assert.isString(login);
      // assert.isArray(clients); // todo нужен массив clients
    });
  });

  describe('Error behavior', function () {
    it('should checkAccount without data', async function () {
      const exist = await oauth.check(undefined, false);

      assert.isBoolean(exist);
      assert.isFalse(exist);
    });

    it('should createAccount', async function () {
      try {
        const accountId = await oauth.create(userData);
        assert.isUndefined(accountId);
      } catch (e) {
        assert.instanceOf(e, Error);
        // assert.equal(e.message, 'Auth-server returned \'Conflict\' with code 409.');
      }
    });

    it('should checkAccount with data after create', async function () {
      const exist = await oauth.check('takogo-accounta-net', true);

      assert.isBoolean(exist);
      assert.isFalse(exist);
    });
  });
});