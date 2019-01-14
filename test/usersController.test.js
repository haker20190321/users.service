const chai = require('chai');
const {knex: connects} = require('../config');
const db = require('knex')(connects);

const usersController = require('../controllers/usersController');

/** @namespace chai.assert */
const assert = chai.assert;

chai.should();

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

const {makeUser, sleep} = require('./helper');
const timeout = 300;

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
    }, {db});

    assert.typeOf(user, 'object');
    assert.hasAllKeys(user, usersFields);

    await sleep(timeout);
  });

  it('should updateUser', async function () {
    const first_name = 'updated_name';
    const params = {
      userId: {
        value: user.id
      },
      userData: {
        value: {first_name}
      }
    };
    const res = await usersController.updateUser(params, {db});

    assert.typeOf(res, 'object');
    assert.hasAllKeys(res, usersFields);
    assert.strictEqual(first_name, res.first_name);
    assert.strictEqual(user.id, res.id);

    await sleep(timeout);
  });

  it('should getUser', async function () {
    const params = {
      userId: {
        value: user.id
      }
    };
    const res = await usersController.getUser(params, {db});
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
    const res = await usersController.deleteUser(params, {db});

    assert.isTrue(res);

    await sleep(timeout);
  });

  it('should searchUsers', async function () {
    const params = {
      params: {
        value: {}
      }
    };

    const res = await usersController.searchUsers(params, {db});

    assert.isArray(res);
    res.forEach(user => {
      assert.hasAllKeys(user, usersFields);
    });

    await sleep(timeout);
  });
});