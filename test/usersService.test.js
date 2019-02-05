const assert = require('chai').assert;
const User = require('../service/usersService');
const Models = require('../db/models');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');
const {AuthSuccess, AuthExist, AuthReject} = require('./mockOAuth');

const {makeUser, sleep} = require('./helper');
const timeout = 0;
const usersFields = [
  'id',
  'firstName',
  'lastName',
  'middleName',
  'isActive',
  'login'
];
let userId = null;

describe('usersService tests', function () {
  describe('Normal behavior', function () {
    const userData = makeUser();

    it('should create', async function () {
      const res = await User.createUser(userData, {Models, logger, OAuth: new AuthSuccess()});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);

      userId = res.id;

      await sleep(timeout);
    });

    it('should create exist login in service', async function () {
      try {
        const res = await User.createUser(userData, {Models, logger,OAuth: new AuthExist()});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, `CreateUser: User with login ${userData.login} is exist in service`);
      }

      await sleep(timeout);
    });


    it('should create exist login in ldap', async function () {
      const userData = makeUser();
      try {
        const res = await User.createUser(userData, {Models, logger,OAuth: new AuthExist()});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, `CreateUser: User with login ${userData.login} is exist in ldap`);
      }

      await sleep(timeout);
    });

    it('should update', async function () {
      const firstName = 'updated_name';
      const res = await User.updateUser(userId, {firstName, createdAt: 11}, {Models, logger});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(firstName, res.firstName);
      assert.strictEqual(userId, res.id);

      await sleep(timeout);
    });

    it('should get by id', async function () {
      const res = await User.getUser(userId, {Models, logger});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(userId, res.id);

      await sleep(timeout);
    });

    it('should search users', async function () {
      const res = await User.searchUsers({
        limit: 10,
        offset: 0,
        where: {
          id: {[Symbol.for('gte')]: 0}
        }
      }, {Models, logger});

      assert.typeOf(res, 'array');
      assert.isTrue(res.length > 0);

      await sleep(timeout);
    });

    it('should delete by id', async function () {
      const res = await User.deleteUser(userId, {Models, logger});

      assert.typeOf(res, 'boolean');
      assert.isTrue(res);

      await sleep(timeout);
    });
  });

  describe('Error behavior', function () {
    const userData = makeUser();

    it('should create', async function () {
      userData.lastName = null;

      try {
        const res = await User.createUser(userData, {Models, logger, OAuth: new AuthReject()});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
      }

      await sleep(timeout);
    });

    it('should update', async function () {
      try {
        const first_name = 'FooName11';
        const res = await User.updateUser(userId, {first_name}, {Models, logger});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }

      await sleep(timeout);
    });

    it('should get by id', async function () {
      try {
        const res = await User.getUser(userId, {Models, logger});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }

      await sleep(timeout);
    });

    it('should search users', async function () {
      try {
        const res = await User.searchUsers({}, {Models, logger});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
      }

      await sleep(timeout);
    });

    it('should delete by id', async function () {
      try {
        const res = await User.deleteUser(userId, {Models, logger});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error)
      }

      await sleep(timeout);
    });
  });
});