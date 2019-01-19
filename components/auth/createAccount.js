const ssha = require('ssha');
const http = require('https');
const querystring = require('querystring');
const {oauth} = require('../../config');

module.exports = (userData) => {
  //todo remove after ldap stabilization
  return new Promise((resolve) => resolve(
    Math.floor(Math.random() * 10000000)
  ));

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
        return reject(new Error(`Auth-server returned '${response.statusMessage}' ` +
          `with code ${response.statusCode}.`));
      }

      const chunks = [];

      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        try {
          const body = JSON.parse(Buffer.concat(chunks));
          // eslint-disable-next-line id-blacklist
          const {data: resData} = body;
          const {user_id: userId} = resData;

          if (typeof userId === 'number') {
            return resolve(userId);
          }

          return reject(new Error(`Type of userId must be number, ${typeof result} given. ` +
            `Response: ${body}`));
        } catch(error) {
          return reject(error);
        }
      });
    });

    request.on('error', reject);
    request.write(params);
    request.end();
  });
};