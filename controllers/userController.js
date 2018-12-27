'use strict';
const User = require('../components/user/user');

module.exports = {
  /**
   * Create user
   * @param request
   * @param response
   */
  createUser: (request, response) => {
    const {params} = request.swagger;
    const userData = params.userData.value;

    try {
      response.send(User.create(userData));
    } catch (e) {
      response.status(500)
        .send({message: e.message, code: 500})
    }
  },
  /**
   * Update user
   * @param request
   * @param response
   */
  updateUser: (request, response) => {
    const {params} = request.swagger;
    const userId = params.userId.value;
    const userData = params.userData.value;

    try {
      response.send(User.update(userId, userData));
    } catch (e) {
      response.status(404)
        .send({message: e.message, code: 404})
    }
  },
  /**
   * Get user by id
   * @param request
   * @param response
   */
  getUserById: (request, response) => {
    const {params} = request.swagger;
    const userId = params.userId.value;

    try {
      response.send(User.getByUserId(userId));
    } catch (e) {
      response.status(404)
        .send({message: e.message, code: 404})
    }
  },
  /**
   * Get user by account id
   * @param request
   * @param response
   */
  getUserByAccountId: (request, response) => {
    // TODO implement
    response.status(200);
  },
  /**
   * Delete user by id
   * @param request
   * @param response
   */
  deleteUserById: (request, response) => {
    // TODO implement
    response.status(200);
  },
  /**
   * Delete user by account id
   * @param request
   * @param response
   */
  deleteUserByAccountId: (request, response) => {
    // TODO implement
    response.status(200);
  }
};