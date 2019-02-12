'use strict';
const http = require('https');
const ssha = require('ssha');
const querystring = require('querystring');

module.exports = class Auth {
  constructor(conf) {
    this._conf = conf;
  }

  check(login, withData = false) {
    const options = {
      hostname: this._conf.hostname,
      path: `${this._conf.path}/accounts?api_key=${this._conf.apiKey}&login=${login}`,
      method: 'GET',
      timeout: this._conf.requestTimeout
    };

    if (withData) {
      options.path += '&data=true';
    }

    return new Promise((resolve, reject) => {
      const request = http.request(options, (response) => {
        if (response.statusCode !== 200) {
          return reject(new Error(`Auth-server returned '${response.statusMessage}' ` +
            `with code ${response.statusCode}.`));
        }

        const chunks = [];

        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          try {
            const result = JSON.parse(Buffer.concat(chunks));

            return resolve(result);
          } catch(error) {
            return reject(new Error(`CheckAccount: ${error.message}`));
          }
        });
      });

      request.on('error', (error) => reject(error));
      request.end();
    });
  }

  create(userData) {
    const params = querystring.stringify({
      login: userData.login,
      hash: ssha.create(userData.password),
      fn: userData.firstName,
      ln: userData.lastName,
      pn: userData.middleName,
      email: userData.email
    });

    const options = {
      hostname: `${this._conf.hostname}`,
      path: `${this._conf.path}/accounts?api_key=${this._conf.apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params)
      },
      timeout: this._conf.requestTimeout
    };

    return new Promise((resolve, reject) => {
      const request = http.request(options, (response) => {
        if (response.statusCode !== 200) {
          return reject(new Error(`Auth-server returned '${response.statusMessage}' ` +
            `with code ${response.statusCode}.`));
        }

        const chunks = [];

        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks));
            const {data: resData} = body; // eslint-disable-line id-blacklist
            const {user_id: userId} = resData || {};

            if (typeof userId !== 'number') {
              return reject(new Error(`Type of userId must be number, ${typeof userId} given. ` +
                `Response: ${body}`));
            }

            return resolve(userId);
          } catch(error) {
            return reject(error);
          }
        });
      });

      request.on('error', reject);
      request.write(params);
      request.end();
    });
  }
};