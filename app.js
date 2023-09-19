const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const { initialize } = require('express-openapi');
const v1ApiDoc = require('yamljs').load('./api-doc.yml');
const swaggerUi = require('swagger-ui-express')
require('./db')
const app = express();

initialize({
  app,
  apiDoc: v1ApiDoc,
  dependencies: require('./api/v1/services'),
  paths: './api/v1/routes',
  errorMiddleware: function(err, req, res, next) { 
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  }
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// OpenAPI UI
app.use(
    "/api/v1/api-doc",
    swaggerUi.serve,
    swaggerUi.setup(v1ApiDoc)
);

module.exports = app;
