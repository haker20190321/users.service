const assert = require('chai').assert;
const User = require('../service/usersService');
const {knex: connects} = require('../config');
const db = require('knex')(connects);

const {makeUser, sleep} = require('./helper');
const timeout = 300;
const usersFields = [
  'id',
  'account_id',
  'first_name',
  'last_name',
  'middle_name',
  'birthday',
  'is_active',
  'login'
];
let userId = null,
  accountId = null;

describe('usersService tests', function () {
  describe('Normal behavior', function () {
    const userData = makeUser();

    it('should create', async function () {
      const res = await User.createUser(userData, {db});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);

      userId = res.id;
      accountId = res.account_id;

      await sleep(timeout);
    });

    it('should create exist login', async function () {
      try {
        const res = await User.createUser(userData, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, `CreateUser: User with login ${userData.login} is exist`);
      }

      await sleep(timeout);
    });

    it('should update', async function () {
      const first_name = 'updated_name';
      const res = await User.updateUser(userId, {first_name}, {db});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(first_name, res.first_name);
      assert.strictEqual(userId, res.id);

      await sleep(timeout);
    });

    it('should get by id', async function () {
      const res = await User.getUser(userId, {db});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(userId, res.id);

      await sleep(timeout);
    });

    it('should search users', async function () {
      const name = 'User';
      const res = await User.searchUsers({name}, {db});

      assert.typeOf(res, 'array');
      assert.isTrue(res.length > 0);

      await sleep(timeout);
    });

    it('should delete by id', async function () {
      const res = await User.deleteUser(userId, {db});

      assert.typeOf(res, 'boolean');
      assert.isTrue(res);

      await sleep(timeout);
    });
  });

  describe('Error behavior', function () {
    const userData = makeUser();

    it('should create', async function () {
      userData.middle_name = null;

      try {
        const res = await User.createUser(userData, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
      }

      await sleep(timeout);
    });

    it('should update', async function () {
      try {
        const first_name = 'FooName11';
        const res = await User.updateUser(userId, {first_name}, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }

      await sleep(timeout);
    });

    it('should get by id', async function () {
      try {
        const res = await User.getUser(userId, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }

      await sleep(timeout);
    });

    it('should search users', async function () {
      try {
        const res = await User.searchUsers({}, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
      }

      await sleep(timeout);
    });

    it('should delete by id', async function () {
      const res = await User.deleteUser(userId, {db});

      assert.isFalse(res);

      await sleep(timeout);
    });
  });
});