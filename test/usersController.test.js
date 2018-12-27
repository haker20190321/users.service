const chai = require('chai');
const usersController = require('../controllers/usersController');
/** @namespace chai.assert */
const assert = chai.assert;

chai.should();

describe('usersController test', function () {
  it('should test', function () {
    assert.hasAllKeys(usersController, [
      'createUser',
      'updateUser',
      'getUser',
      'deleteUser',
      'searchUsers'
    ]);
  });
});