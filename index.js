'use strict';

const Service = require('@esoft_private/esoft-service');
const path = require('path');
const {
  knex: {connection},
  closeTimeout,
  oauth
} = require('./config');
const Models = require('./db/models');
const OAuth = require('./components/oauth');

const service = new Service({
  specDoc: path.resolve(__dirname, './specifications/users.service.yml'),
  router: true,
  validator: true,
  controllers: path.resolve(__dirname, 'controllers'),
  db: {
    connection,
    closeTimeout
  }
});

service.use('Models', Models);
service.use('OAuth', new OAuth(oauth));

service.initialize();