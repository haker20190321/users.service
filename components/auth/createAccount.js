const ssha = require('ssha');
const http = require('https');
const querystring = require('querystring');
const {oauth} = require('../../config');

module.exports = (userData) => {
  const params = querystring.stringify({
    login: userData.login,
    hash: ssha.create(userData.password),
    fn: userData.first_name,
    ln: userData.last_name,
    pn: userData.middle_name,
    email: userData.email
  });

  const options = {
    hostname: `${oauth.hostname}`,
    path: `${oauth.path}/accounts?api_key=${oauth.api_key}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(params)
    },
    timeout: 1000
  };

  return new Promise((resolve, reject) => {
    const request = http.request(options, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`Server returned status code ${response.statusCode}.`));
      }

      let result = '';

      response.on('data', (chunk) => result += chunk.toString());
      response.on('end', () => {
        try {
          const {user_id: userId} = JSON.parse(result);

          if (typeof userId === 'number') {
            return resolve(userId);
          }

          return reject(new Error(`Type of userId must be number, ${typeof result} given. ` +
            `Response: ${result}`));
        } catch(error) {
          return reject(error);
        }
      });
    });

    request.on('error', (error) => reject(error));
    request.write(params);
    request.end();
  });
};