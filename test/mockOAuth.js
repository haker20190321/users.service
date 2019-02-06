'use strict';

module.exports.AuthSuccess = class AuthSuccess {
  constructor(config) {
    this._config = config
  }

  check(login, withData = false) {
    return new Promise((resolve) => resolve(false));
  }

  create(userData) {
    return new Promise((resolve) => resolve(randInt()));
  }
};

module.exports.AuthReject = class AuthReject {
  constructor(config) {
    this._config = config
  }

  check(login, withData = false) {
    return new Promise((resolve, reject) => reject(new Error('reject')));
  }

  create(userData) {
    return new Promise((resolve, reject) => reject(new Error('reject')));
  }
};

module.exports.AuthExist = class AuthExist {
  constructor(config) {
    this._config = config
  }

  check(login, withData = false) {
    return new Promise((resolve) => {
      if (withData) {
        return resolve({id: randInt()});
      }
      return resolve(true);
    });
  }

  create(userData) {
    return new Promise((resolve, reject) => reject(new Error('login exist')));
  }
};

const randInt = () => Math.floor(Math.random() * 10000000);