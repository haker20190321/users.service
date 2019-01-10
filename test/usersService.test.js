const chai = require('chai');
const User = require('../service/usersService');
/** @namespace chai.assert */
const assert = chai.assert;
const {connects} = require('../config');
const db = require('knex')(connects);

chai.should();

let userId = null,
  accountId = null;
const usersFields = [
  'id',
  'account_id',
  'first_name',
  'last_name',
  'middle_name',
  'birthday',
  'is_active'
];

describe('usersService tests', function () {
  describe('Normal behavior', function () {
    it('should create', async function () {
      const userData = {
        login: 'FooName',
        password: '11112222',
        first_name: 'Foo',
        last_name: 'Bar',
        middle_name: null,
        birthday: new Date().toISOString()
      };
      const res = await User.createUser(userData, {db});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);

      userId = res.id;
      accountId = res.accountId;
    });

    it('should update', async function () {
      const userData = {first_name: 'FooName11'};
      const res = await User.updateUser(userId, userData, {db});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(userData.first_name, res.first_name);
      assert.strictEqual(userId, res.id);
    });

    it('should get by id', async function () {
      const res = await User.getUser(userId, {db});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(userId, res.id);
    });

    it('should search users', async function () {
      const name = 'User';
      const res = await User.searchUsers({name}, {db});

      assert.typeOf(res, 'array');
      assert.isTrue(res.length > 0);
    });

    it('should delete by id', async function () {
      const res = await User.deleteUser(userId, {db});

      assert.typeOf(res, 'boolean');
      assert.isTrue(res);
    });
  });

  describe('Error behavior', function () {
    it('should create', async function () {
      const userData = {
        middle_name: null
      };

      try {
        const res = await User.createUser(userData, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
      }
    });

    it('should update', async function () {
      try {
        const userData = {first_name: 'FooName11'};
        const res = await User.updateUser(userId, userData, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }
    });

    it('should get by id', async function () {
      try {
        const res = await User.getUser(userId, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }
    });

    it('should search users', async function () {
      try {
        const res = await User.searchUsers({}, {db});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
      }
    });

    it('should delete by id', async function () {
      const res = await User.deleteUser(userId, {db});

      assert.isFalse(res);
    });
  });
});