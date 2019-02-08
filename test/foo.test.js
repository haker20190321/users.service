'use strict';

const assert = require('chai').assert;

const Models = require('../db/models');
const usersService = require('../service/usersService');
const usersController = require('../controllers/usersController');
const errorFunc = (message) => console.warn(`ErrorFunc: ${message}`);
const {
  UniqueConstraintError,
  ForeignKeyConstraintError
} = Models.Sequelize;

describe('foo test', function() {

  // it('should update', async function() {
  //   const res = await usersService.updateUserRelationships({
  //     head: 8283292
  //   }, {under: {$eq: 8283292}}, {Models});
  //   console.warn(res);
  // });
  //
  // it('should delete', async function() {
  //   const res = await usersService.deleteUserRelationship(8283292, 8283292, {Models});
  //   console.warn(res)
  // });
});