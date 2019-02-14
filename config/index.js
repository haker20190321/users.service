'use strict';
const ip = require('ip');

module.exports = {
  knex: {
    client: 'pg',
    connection: {
      host: '10.9.3.193',
      port: '5432',
      user: 'test_user',
      password: 'test_password',
      database: 'users'
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'users_migrations',
      directory: './migrations'
    }
  },
  closeTimeout: 300,
  oauth: {
    hostname: 'dev-oauth.esoft.cloud',
    path: '/api/v1',
    clientId: 'dev_ecosystem_001',
    clientSecret: 't715mrk8RF9Q6ZUq',
    redirectUri: 'http://app.esoft.team:9090/auth/handle',
    apiKey: 'YWpQM2JVNGJHQkI3OXVnbnVoQlByY2dXVXNSVGdaaDZrZGpnNDVuTlBuaDZ1ZWZSIDEwLjEyLjEuNzk=',
    apiKeys: {
      accounts: {
        get: 'C-9-5-15-AfT7bqVMp-CkpyQgpG8-d7mbYcREs-3597',
        post: 'E-4-4-19-xcXoynwIv-U9XvFDSH0-d7F3TRgGc-5973',
        put: 'Z-8-3-54-9doPBmARq-4qepWgT4s-kmpnwexzb-7910',
        delete: 'E-2-9-77-t9Es5LgmL-om3bNoUfo-SoiYusFwY-1455'
      }
    },
    myIp: ip.address(),
    requestTimeout: 6000
  }
};