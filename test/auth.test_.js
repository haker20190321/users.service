const assert = require('chai').assert;

const OAuth = require('../components/oauth');
const conf = require('../config').oauth;
const oauth = new OAuth(conf);

const {sleep, makeUser} = require('./helper');
const timeout = 500;

const userData = makeUser();

describe('Auth components test', function () {
  describe('Normal behavior', function () {
    it('should checkAccount without data', async function () {
      const exist = await oauth.check(userData.login, false);

      assert.isBoolean(exist);
      assert.isFalse(exist);

      await sleep(timeout);
    });

    it('should createAccount', async function () {
      const accountId = await oauth.create(userData);

      assert.isNumber(accountId);

      await sleep(timeout);
    });

    it('should checkAccount with data after create', async function () {
      const exist = await oauth.check(userData.login, true);
      const {
        id,
        login,
        clients
      } = exist;

      assert.isString(id); // сервер возвращает id строкой
      assert.isString(login);
      // assert.isArray(clients); // todo нужен массив clients

      await sleep(timeout);
    });
  });

  describe('Error behavior', function () {
    it('should checkAccount without data', async function () {
      const exist = await oauth.check(undefined, false);

      assert.isBoolean(exist);
      assert.isFalse(exist);

      await sleep(timeout);
    });

    it('should createAccount', async function () {
      try {
        const accountId = await oauth.create(userData);
        assert.isUndefined(accountId);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, 'Auth-server returned \'Conflict\' with code 409.');
      }

      await sleep(timeout);
    });

    it('should checkAccount with data after create', async function () {
      const exist = await oauth.check('takogo-accounta-net', true);
      const {
        id,
        login,
        clients
      } = exist;

      assert.isUndefined(id); // сервер возвращает id строкой
      assert.isUndefined(login);
      assert.isUndefined(clients); // todo нужен массив clients

      await sleep(timeout);
    });
  });
});
