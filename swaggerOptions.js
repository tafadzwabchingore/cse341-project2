// swaggerOptions.js
module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: 'http://localhost:2025',
      },
    ],
  },
  apis: ['./routes/*.js'], // adjust to where your route files are with Swagger JSDoc comments
};
