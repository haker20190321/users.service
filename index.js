const oasTools = require('oas-tools');
const swStats = require('swagger-stats');
const jsYaml = require('js-yaml');
const express = require('express');
const path = require('path');
const fs = require('fs');


const spec = fs.readFileSync(path.join(__dirname, 'openapi.yaml'), 'utf8');
const oasDoc = jsYaml.safeLoad(spec);
const app = express();

oasTools.configure({
  checkControllers: true,
  loglevel: process.env.DEBUG === 'enable' ? 'debug' : 'info',
  // customLogger: myLogger,
  strict: true,
  router: true,
  validator: true,
  docs: {
    apiDocs: '/api-docs',
    apiDocsPrefix: '',
    swaggerUi: '/docs',
    swaggerUiPrefix: ''
  },
  ignoreUnknownFormats: true
});

app.use(swStats.getMiddleware({
  swaggerSpec: oasDoc,
  uriPath: '/service',
  name: 'here_must_be_name_from_config',
  version: 'here_must_be_version_from_config'
}));

oasTools.initializeMiddleware(oasDoc, app, function(middleware) {
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerValidator());
  app.use(middleware.swaggerRouter());
  app.use(middleware.swaggerUi());

  app.listen(8085);
});