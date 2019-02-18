const {closeTimeout} = require('./index');

module.exports = {
  development: {
    dialect: 'postgres',
    database: 'users',
    port: 5432,
    replication: {
      read: [
        {host: 'localhost', username: 'test_user', password: 'test_user'},
        // {host: '10.9.3.193', username: 'test_user', password: 'test_password'}
      ],
      write: {host: 'localhost', username: 'test_user', password: 'test_user'}
    },
    pool: {
      max: 50,
      min: 0,
      acquire: 5000,
      idle: closeTimeout * 1000
    }
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres'
  }
};