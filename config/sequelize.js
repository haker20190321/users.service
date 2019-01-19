module.exports = {
  development: {
    dialect: 'postgres',
    database: 'users',
    port: 5432,
    replication: {
      read: [
        {host: 'localhost', username: 'test_user', password: 'test_user'},
        {host: 'localhost', username: 'test_user', password: 'test_user'}
      ],
      write: {host: 'localhost', username: 'test_user', password: 'test_user'}
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
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
    dialect: 'mysql'
  }
};