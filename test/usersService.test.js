const assert = require('chai').assert;
const User = require('../service/usersService');
const Models = require('../db/models');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');
const {AuthSuccess, AuthExist, AuthReject} = require('./mockOAuth');

const {makeUser} = require('./helper');
const timeout = 0;
const usersFields = [
  'id',
  'firstName',
  'lastName',
  'middleName',
  'isActive',
  'positionId'
];
let userId = null;

describe('usersService tests', function () {
  describe('Normal behavior', function () {
    let userData;

    it('should init', async function() {
      userData = await makeUser();
    });

    it('should create', async function () {
      const res = await User.createUser(userData, {Models, logger, OAuth: new AuthSuccess()});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);

      userId = res.id;
    });

    it('should create exist login', async function () {
      try {
        const res = await User.createUser(userData, {Models, logger, OAuth: new AuthExist()});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, `CreateUser: user with login ${userData.login} is exist`);
      }
    });

    it('should update', async function () {
      const firstName = 'updated_name';
      const res = await User.updateUser(userId, {firstName, createdAt: 11}, {Models, logger});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(firstName, res.firstName);
      assert.strictEqual(userId, res.id);
    });

    it('should get by id', async function () {
      const res = await User.getUser(userId, [], {Models, logger});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(userId, res.id);
    });

    it('should get by id with roles', async function () {
      const res = await User.getUser(userId, ['roles'], {Models, logger});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, [...usersFields, 'roles']);
      assert.strictEqual(userId, res.id);
    });

    it('should get by id with with undefined appends', async function () {
      const res = await User.getUser(userId, undefined, {Models, logger});

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, [...usersFields]);
      assert.strictEqual(userId, res.id);
    });

    it('should search users', async function () {
      const res = await User.searchUsers({
        limit: 10,
        offset: 0,
        where: {
          id: {[Symbol.for('gte')]: 0}
        }
      }, [], {Models, logger});

      assert.isArray(res);
      assert.isNotEmpty(res);
    });

    it('should search users with roles', async function () {
      const res = await User.searchUsers({
        limit: 10,
        offset: 0,
        where: {
          id: {[Symbol.for('gte')]: 0}
        }
      }, ['roles'], {Models, logger});

      assert.isArray(res);
      assert.isNotEmpty(res);
    });

    it('should search users with undefined appends', async function () {
      const res = await User.searchUsers({
        limit: 10,
        offset: 0,
        where: {
          id: {[Symbol.for('gte')]: 0}
        }
      }, undefined, {Models, logger});

      assert.isArray(res);
      assert.isNotEmpty(res);
    });

    let relationship, secondUser;

    it('should create relationship', async function() {
      secondUser = await User.createUser(await makeUser(), {Models, logger, OAuth: new AuthSuccess()});
      relationship = await User.createUserRelationship(userId, secondUser.id, {Models});

      assert.isObject(relationship);
      assert.hasAllKeys(relationship, ['head', 'under']);
      assert.strictEqual(relationship.head, userId);
      assert.strictEqual(relationship.under, secondUser.id);
    });

    it('should create relationship pair already exist', async function() {
      const {head, under} = relationship;
      try {
        const res = await User.createUserRelationship(head, under, {Models});
        assert.isUndefined(res);
      } catch(e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, `Pair head = ${head}, under = ${under} already exists`)
      }
    });

    it('should update relationship', async function() {
      const thirdUser = await User.createUser(await makeUser(), {Models, logger, OAuth: new AuthSuccess()});
      [relationship] = await User.updateUserRelationships({
        head: thirdUser.id,
      }, {under: secondUser.id}, {Models});

      assert.isObject(relationship);
      assert.hasAllKeys(relationship, ['head', 'under']);
      assert.strictEqual(relationship.head, thirdUser.id);
      assert.strictEqual(relationship.under, secondUser.id);
    });

    it('should delete relationships', async function() {
      const res = await User.deleteUserRelationship(relationship.head, relationship.under, {Models});

      assert.isBoolean(res);
      assert.isTrue(res);
    });

    it('should delete by id', async function () {
      const res = await User.deleteUser(userId, {Models, logger});

      assert.typeOf(res, 'boolean');
      assert.isTrue(res);
    });
  });

  describe('Error behavior', function () {
    let userData;

    it('should create', async function () {
      userData = await makeUser();

      userData.lastName = null;

      try {
        const res = await User.createUser(userData, {Models, logger, OAuth: new AuthReject()});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
      }
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
    });

    it('should get by id', async function () {
      try {
        const res = await User.getUser(userId, [], {Models, logger});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }
    });

    it('should get by id with roles', async function () {
      try {
        const res = await User.getUser(userId, ['roles'], {Models, logger});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
        assert.strictEqual(e.message, `user with id ${userId} is missing`);
      }
    });

    it('should search users', async function () {
      try {
        const res = await User.searchUsers({}, {Models, logger});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error);
      }
    });

    it('should create relationship users does not exist', async function() {
      const head = 0,
        under = 0;
      try {
        const res = await User.createUserRelationship(head, under, {Models});
        assert.isUndefined(res);
      } catch(e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, `One or more users out of (${head}, ${under}) does not exist`);
      }
    });

    it('should update relationship', async function() {
      const where = {under: 0};
      try {
        const res = await User.updateUserRelationships({head: 123}, where, {Models});
        assert.isUndefined(res);
      } catch(e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, `no records found with filter '${JSON.stringify(where)}'`)
      }
    });

    it('should delete relationships', async function() {
      try {
        const res = await User.deleteUserRelationship(0, 0, {Models});
        assert.isUndefined(res)
      } catch(e) {
        assert.instanceOf(e, Error);
        assert.equal(e.message, `Pair head = 0, under = 0 does not exist`)
      }
    });

    it('should delete by id', async function () {
      try {
        const res = await User.deleteUser(userId, {Models, logger});
        assert.isUndefined(res);
      } catch (e) {
        assert.instanceOf(e, Error)
      }
    });
  });
});