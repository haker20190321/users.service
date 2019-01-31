'use strict';

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
    hostname: 'oauth2.esoft.cloud',
    path: '/api/v1',
    clientId: 'dev_ecosystem_001',
    clientSecret: 't715mrk8RF9Q6ZUq',
    redirectUri: '',
    apiKey: 'YWpQM2JVNGJHQkI3OXVnbnVoQlByY2dXVXNSVGdaaDZrZGpnNDVuTlBuaDZ1ZWZSIDEwLjEyLjEuNzk=',
    requestTimeout: 6000
  }
};