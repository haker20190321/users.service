const chai = require('chai');
const User = require('../components/user/user');
/** @namespace chai.assert */
const assert = chai.assert;

chai.should();

let userId = null,
  accountId = null;

describe('Users tests', function () {
  describe('Normal behavior', function () {
    it('should create', function () {
      const userData = {name: 'FooName'};
      const res = User.create(userData);

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['name', 'id', 'accountId']);

      userId = res.id;
      accountId = res.accountId;
    });

    it('should update', function () {
      const userData = {name: 'FooName11'};
      const res = User.update(userId, userData);

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['name', 'id', 'accountId']);
      assert.strictEqual(userData.name, res.name);
      assert.strictEqual(userId, res.id);
    });

    it('should get by id', function () {
      const res = User.getByUserId(userId);

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['name', 'id', 'accountId']);
      assert.strictEqual(userId, res.id);
    });

    it('should get by account id', function () {
      const res = User.getByAccountId(accountId);

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, ['name', 'id', 'accountId']);
      assert.strictEqual(accountId, res.accountId);
    });

    it('should delete by id', function () {
      const res = User.deleteByUserId(userId);

      assert.typeOf(res, 'boolean');
      assert.isTrue(res);
    });

    it('should delete by account id', function () {
      const res = User.deleteByAccountId(accountId);

      assert.typeOf(res, 'boolean');
      assert.isFalse(res); // because it should already be deleted
    });
  });
  describe('Error behavior', function () {
    it('should create', function () {
      const userData = {name: 'ss'};

      try {
        const res = User.create(userData);
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, 'the number of characters in the name must be greater than 2')
      }
    });

    it('should update', function () {
      try {
        const res = User.update(userId, {name: 'ebobo'});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }
    });

    it('should get by id', function () {
      try {
        const res = User.getByUserId(userId);
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }
    });

    it('should get by account id', function () {
      try {
        const res = User.getByAccountId(accountId);
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${accountId} is missing`);
      }
    });

    it('should delete by id', function () {
      const res = User.deleteByUserId(userId);

      assert.isFalse(res);
    });

    it('should delete by account id', function () {
      const res = User.deleteByAccountId(userId);

      assert.isFalse(res);
    });
  });
});