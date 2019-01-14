'use strict';

module.exports = {
  knex: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: '5432',
      user: 'test_user',
      password: 'test_user',
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
  oauth: {
    'hostname': 'oauth2.esoft.cloud',
    'path': '/api/v1',
    'client_id': 'dev_ecosystem_001',
    'client_secret': 't715mrk8RF9Q6ZUq',
    'redirect_uri': '',
    'api_key': 'YWpQM2JVNGJHQkI3OXVnbnVoQlByY2dXVXNSVGdaaDZrZGpnNDVuTlBuaDZ1ZWZSIDEwLjEyLjEuNzk='
  }
};