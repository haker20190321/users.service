const chai = require('chai');
const User = require('../service/usersService');
/** @namespace chai.assert */
const assert = chai.assert;

chai.should();

let userId = null,
  accountId = null;

describe('usersService tests', function () {
  describe('Normal behavior', function () {
    it('should create', function () {
      const userData = {name: 'FooName'};
      const res = User.createUser(userData);

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['name', 'id', 'accountId']);

      userId = res.id;
      accountId = res.accountId;
    });

    it('should update', function () {
      const userData = {name: 'FooName11'};
      const res = User.updateUser(userId, userData);

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['name', 'id', 'accountId']);
      assert.strictEqual(userData.name, res.name);
      assert.strictEqual(userId, res.id);
    });

    it('should get by id', function () {
      const res = User.getUser(userId);

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['name', 'id', 'accountId']);
      assert.strictEqual(userId, res.id);
    });

    it('should delete by id', function () {
      const res = User.deleteUser(userId);

      assert.typeOf(res, 'boolean');
      assert.isTrue(res);
    });

    it('should search users', function () {
      const name = 'User';
      const res = User.searchUsers({name});

      assert.typeOf(res, 'array');
      assert.isTrue(res.length > 0);
    });
  });

  describe('Error behavior', function () {
    it('should create', function () {
      const userData = {name: 'ss'};

      try {
        const res = User.createUser(userData);
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, 'the number of characters in the name must be greater than 2')
      }
    });

    it('should update', function () {
      try {
        const res = User.updateUser(userId, {name: 'ebobo'});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }
    });

    it('should get by id', function () {
      try {
        const res = User.getUser(userId);
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }
    });

    it('should delete by id', function () {
      const res = User.deleteUser(userId);

      assert.isFalse(res);
    });

    it('should search users', function () {
      try {
        const res = User.searchUsers({});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, 'name is missing');
      }
    });
  });
});