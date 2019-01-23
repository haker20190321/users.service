const chai = require('chai');
const Models = require('../db/models');
const usersController = require('../controllers/usersController');

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
  'createdAt',
  'updatedAt',
  'deletedAt'
];

const {makeUser, sleep} = require('./helper');
const timeout = 0;

describe('usersController test', function () {
  it('should controller has methods', function () {
    assert.hasAllKeys(usersController, [
      'createUser',
      'updateUser',
      'getUser',
      'deleteUser',
      'searchUsers'
    ]);
  });

  const userData = makeUser();
  let user = {};

  it('should createUser', async function () {
    user = await usersController.createUser({
      userData: {
        value: userData
      }
    }, {Models});

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
    const res = await usersController.updateUser(params, {Models});

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
    const res = await usersController.getUser(params, {Models});
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
    const res = await usersController.deleteUser(params, {Models});

    assert.isTrue(res);

    await sleep(timeout);
  });

  it('should searchUsers', async function () {
    const params = {
      searchParams: {
        value: {}
      }
    };

    const res = await usersController.searchUsers(params, {Models});

    assert.isArray(res);
    res.forEach(user => {
      assert.hasAllKeys(user, usersFields);
    });

    await sleep(timeout);
  });
});