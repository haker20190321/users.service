'use strict';

const Service = require('@esoft_private/esoft-service');
const path = require('path');
const {
  knex: {connection},
  closeTimeout
} = require('./config');
const Models = require('./db/models');

const service = new Service({
  specDoc: path.resolve(__dirname, './specifications/users.service.yaml'),
  router: true,
  validator: true,
  controllers: path.resolve(__dirname, 'controllers'),
  db: {
    connection,
    closeTimeout
  }
});

service.use('Models', Models);

service.initialize();