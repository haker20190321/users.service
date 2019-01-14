const http = require('https');
const {oauth} = require('../../config');

module.exports = (login, withData = false) => {
  const options = {
    hostname: oauth.hostname,
    path: `${oauth.path}/accounts?api_key=${oauth.api_key}&login=${login}`,
    method: 'GET',
    timeout: 1000
  };

  if (withData) {
    options.path += '&data=true';
  }

  return new Promise((resolve, reject) => {
    const request = http.request(options, (response) => {
      try {
        if (response.statusCode !== 200) {
          return reject(new Error(`Auth-server returned '${response.statusMessage}' ` +
            `with code ${response.statusCode}.`));
        }

        let result = '';

        response.on('data', (chunk) => result += chunk.toString());
        response.on('end', () => {
          const exist = JSON.parse(result);

          return resolve(exist);
        });
      } catch(error) {
        reject(new Error(`CheckAccount: ${error.message}`));
      }
    });

    request.on('error', (error) => reject(error));
    request.end();
  });
};
