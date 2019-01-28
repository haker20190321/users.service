const chai = require('chai');
const Models = require('../db/models');
const usersController = require('../controllers/usersController');
const loggerFunc = require('@esoft_private/esoft-service/src/lib/logger');
const logger = loggerFunc('Test');


/** @namespace chai.assert */
const assert = chai.assert;

chai.should();

const usersFields = [
  'id',
  'firstName',
  'lastName',
  'middleName',
  'isActive',
  'login'
];

const {makeUser, sleep} = require('./helper');
const timeout = 0;
const errorLog = console.warn;

describe('usersController test', function () {
  const userData = makeUser();
  let user = {};

  describe('Normal behavior', function () {
    it('should controller has methods', function () {
      assert.hasAllKeys(usersController, [
        'createUser',
        'updateUser',
        'getUser',
        'deleteUser',
        'searchUsers'
      ]);
    });


    it('should createUser', async function () {
      user = await usersController.createUser({
        userData: {
          value: userData
        }
      }, {Models, logger}, errorLog);

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
    const userData = makeUser();
    delete userData.login;
    it('should createUser', async function () {
      const user = await usersController.createUser({
        userData: {
          value: userData
        }
      }, {Models, logger}, errorLog);
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
  });
});