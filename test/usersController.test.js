const chai = require('chai');
const {knex: connects} = require('../config');
const db = require('knex')(connects);

const usersController = require('../controllers/usersController');

/** @namespace chai.assert */
const assert = chai.assert;

chai.should();

const userData = require('./makeUser')();

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

  it('should createUser', async function () {
    const res = usersController.createUser({
      userData: {
        value: userData
      }
    }, {db});

    assert.instanceOf(res, Promise);
  });

  it('should updateUser', function () {

  });

  it('should getUser', function () {

  });

  it('should deleteUser', function () {

  });

  it('should searchUsers', function () {

  });
});