const express = require('express');
const swagger = express();





const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');

const specs = swaggerJsdoc(swaggerOptions);

swagger.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));






module.exports = swagger;
