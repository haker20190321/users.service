const chai = require('chai');
const Models = require('../db/models');
const usersController = require('../controllers/usersController');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');
const {AuthSuccess} = require('./mockOAuth');

/** @namespace chai.assert */
const assert = chai.assert;

chai.should();

const usersFields = [
  'id',
  'firstName',
  'lastName',
  'middleName',
  'isActive',
  'login',
  'positionId'
];

const {makeUser, sleep} = require('./helper');
const timeout = 0;
const errorLog = console.warn;

describe('usersController test', function () {
  let user = {};

  describe('Normal behavior', function () {
    let userData;

    it('should init', async function() {
      userData = await makeUser();
    });

    it('should controller has methods', function () {
      assert.hasAllKeys(usersController, [
        'createUser',
        'updateUser',
        'getUser',
        'deleteUser',
        'searchUsers',
        'createUserRelationship',
        'updateUserRelationships',
        'deleteUserRelationship'
      ]);
    });

    it('should createUser', async function () {
      user = await usersController.createUser({
        userData: {
          value: userData
        }
      }, {Models, logger, OAuth: new AuthSuccess()}, errorLog);

      assert.typeOf(user, 'object');
      assert.hasAllKeys(user, usersFields);

      await sleep(timeout);
    });

    it('should updateUser', async function () {
      const firstName = 'updated_name';
      const params = {
        userId: {
          value: user.id
        },
        userData: {
          value: {firstName}
        }
      };
      const res = await usersController.updateUser(params, {Models, logger}, errorLog);

      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(firstName, res.firstName);
      assert.strictEqual(user.id, res.id);

      await sleep(timeout);
    });

    it('should getUser', async function () {
      const params = {
        userId: {
          value: user.id
        }
      };
      const res = await usersController.getUser(params, {Models, logger},errorLog);
      assert.typeOf(res, 'object');
      assert.hasAllKeys(res, usersFields);
      assert.strictEqual(user.id, res.id);

      await sleep(timeout);
    });

    let secondUser;

    it('should createUserRelationship', async function() {
      secondUser = await usersController.createUser({
        userData: {
          value: await makeUser()
        }
      }, {Models, logger, OAuth: new AuthSuccess()}, errorLog);

      const res = await usersController.createUserRelationship({
        head: user.id,
        under: secondUser.id,
      }, {Models}, errorLog);

      assert.isObject(res);
      assert.equal(res.head, user.id);
      assert.equal(res.under, secondUser.id)
    });

    let thirdUser;

    it('should updateUserRelationship', async function() {
      thirdUser = await usersController.createUser({
        userData: {
          value: await makeUser()
        }
      }, {Models, logger, OAuth: new AuthSuccess()}, errorLog);

      const [res] = await usersController.updateUserRelationships({
        params: {under: thirdUser.id},
        where: {head: user.id, under: secondUser.id}
      }, {Models}, errorLog);

      assert.isObject(res);
      assert.equal(res.head, user.id);
      assert.equal(res.under, thirdUser.id)
    });

    it('should deleteUserRelationship', async function() {
      const res = await usersController.deleteUserRelationship({
        head: user.id,
        under: thirdUser.id
      }, {Models}, errorLog);

      assert.isBoolean(res);
      assert.isTrue(res);
    });

    it('should deleteUser', async function () {
      const params = {
        userId: {
          value: user.id
        }
      };
      const res = await usersController.deleteUser(params, {Models, logger}, errorLog);

      assert.isTrue(res);

      await sleep(timeout);
    });

    it('should searchUsers', async function () {
      const params = {
        searchParams: {
          value: {}
        }
      };

      const res = await usersController.searchUsers(params, {Models, logger}, errorLog);

      assert.isArray(res);
      res.forEach(user => {
        assert.hasAllKeys(user, usersFields);
      });

      await sleep(timeout);
    });
  });

  describe('Error behavior', function () {
    let userData;

    it('should init', async function() {
      userData = await makeUser();
      delete userData.login;
    });


    it('should createUser', async function () {
      const user = await usersController.createUser({
        userData: {
          value: userData
        }
      }, {Models, logger, OAuth: new AuthSuccess()}, errorLog);
      assert.isUndefined(user);
    });

    it('should updateUser', async function () {
      const firstName = 'updated_name';
      const params = {
        userId: {
          value: user.id
        },
        userData: {
          value: {firstName}
        }
      };
      const res = await usersController.updateUser(params, {Models, logger}, errorLog);

      assert.isUndefined(res);

      await sleep(timeout);
    });

    it('should getUser', async function () {
      const params = {
        userId: {
          value: user.id
        }
      };
      const res = await usersController.getUser(params, {Models, logger},errorLog);
      assert.isUndefined(res);

      await sleep(timeout);
    });

    it('should deleteUser', async function () {
      const params = {
        userId: {
          value: user.id
        }
      };
      const res = await usersController.deleteUser(params, {Models, logger}, errorLog);

      assert.isUndefined(res);

      await sleep(timeout);
    });

    it('should searchUsers', async function () {
      const params = {
        searchParams: {
          value: {
            where: {
              id: {
                'badOp': user.id
              }
            }
          }
        }
      };

      const res = await usersController.searchUsers(params, {Models, logger}, errorLog);

      assert.isUndefined(res);

      await sleep(timeout);
    });

    let secondUser;

    it('should createUserRelationship', async function() {
        const res = await usersController.createUserRelationship({
          head: 0,
          under: 1,
        }, {Models}, errorLog);

        assert.isUndefined(res);
    });

    let thirdUser;

    it('should updateUserRelationship', async function() {
      const res = await usersController.updateUserRelationships({
        params: {under: 0},
        where: {badArg: 23}
      }, {Models}, errorLog);

      assert.isUndefined(res);
    });

    it('should deleteUserRelationship', async function() {
      const res = await usersController.deleteUserRelationship({
        head: 1,
        under: 0
      }, {Models}, errorLog);

      assert.isUndefined(res)
    });
  });
});