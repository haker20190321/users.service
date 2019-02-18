'use strict';
const http = require('https');
const querystring = require('querystring');

module.exports = class Auth {
  constructor(conf) {
    this._conf = conf;
  }

  check(login, withData = false) {
    const apiKey = this.getApiKey('accounts', 'get');
    const options = {
      hostname: this._conf.hostname,
      path: `${this._conf.path}/accounts?api_key=${apiKey}&login=${login}`,
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

            if (typeof result === 'object') {
              return resolve(result.data);
            }

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

  async create(userData) {
    const {
      firstName,
      lastName,
      middleName,
      login,
      password,
      email
    } = userData;

    const params = {
      login,
      hash: await this.getHash(password),
      displayname: `${lastName} ${firstName} ${middleName}`,
      email,
      clients: [this._conf.clientId]
    };
    const apiKey = this.getApiKey('accounts', 'post');
    const options = {
      hostname: `${this._conf.hostname}`,
      path: `${this._conf.path}/accounts?api_key=${apiKey}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
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
      request.write(querystring.stringify(params));
      request.end();
    });
  }

  getHash(password) {
    const options = {
      hostname: this._conf.hostname,
      path: `${this._conf.path}/hash?password=${password}`,
      method: 'GET',
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
            const result = JSON.parse(Buffer.concat(chunks));

            // eslint-disable-next-line id-blacklist
            const {data: {hash} = {}} = result;

            return resolve(hash);
          } catch(error) {
            return reject(new Error(`getHash: ${error.message}`));
          }
        });
      });

      request.on('error', (error) => reject(error));
      request.end();
    });
  }

  getApiKey(resource, method) {
    const {
      apiKeys,
      myIp
    } = this._conf;

    const key = apiKeys[resource][method];

    return Buffer.from(`${key} ${myIp}`).toString('base64');
  }
};