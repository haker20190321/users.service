const http = require('https');
const {oauth} = require('../../config');

/**
 * Check account
 * @param {String} login
 * @param {Boolean} withData - response with user data
 * @return {Promise<any>}
 */
module.exports = (login, withData = false) => {
  //todo remove after ldap stabilization
  return new Promise((resolve) => resolve(false));

  // eslint-disable-next-line no-unreachable
  const options = {
    hostname: oauth.hostname,
    path: `${oauth.path}/accounts?api_key=${oauth.apiKey}&login=${login}`,
    method: 'GET',
    timeout: oauth.requestTimeout
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

      let result = '';

      response.on('data', (chunk) => result += chunk.toString());
      response.on('end', () => {
        try {
          const result = JSON.parse(result);
        } catch(error) {
          return reject(new Error(`CheckAccount: ${error.message}`));
        }
        return resolve(result);
      });
    });

    request.on('error', (error) => reject(error));
    request.end();
  });
};
