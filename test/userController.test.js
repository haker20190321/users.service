const chai = require('chai');
const clientController = require('../controllers/userController');
const assert = chai.assert;

chai.should();

describe('userController test', function () {
  it('should test', function () {
    assert.hasAllKeys(clientController, [
      'createUser',
      'updateUser',
      'getUserById',
      'getUserByAccountId',
      'deleteUserById',
      'deleteUserByAccountId'
    ]);
  });
});