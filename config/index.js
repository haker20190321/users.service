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
    'addr': '',
    'client_id': '',
    'client_secret': '',
    'redirect_uri': '',
    'api_key': ''
  }
};