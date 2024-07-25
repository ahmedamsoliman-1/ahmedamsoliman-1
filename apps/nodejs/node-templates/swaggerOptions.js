const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodes',
      version: '1.0.0',
      description: 'APIs Documentation',
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;
