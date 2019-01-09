'use strict';
const User = require('../service/usersService');

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
      response.send(User.createUser(userData));
    } catch(error) {
      response.status(500)
        .send({message: error.message, code: 500});
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
      response.send(User.updateUser(userId, userData));
    } catch(error) {
      response.status(404)
        .send({message: error.message, code: 404});
    }
  },
  /**
   * Get user by id
   * @param request
   * @param response
   */
  getUser: (request, response) => {
    const {params} = request.swagger;
    const userId = params.userId.value;

    try {
      response.send(User.getUser(userId));
    } catch(error) {
      response.status(404)
        .send({message: error.message, code: 404});
    }
  },
  /**
   * Delete user by id
   * @param request
   * @param response
   */
  deleteUser: (request, response) => {
    // TODO implement
    response.status(200);
  },
  searchUsers: (request, response) => {
    // TODO implement
    response.status(200);
  }
};