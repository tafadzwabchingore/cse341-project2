// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Farm Goods API',
    description: 'API for selling farm products',
  },
  host: 'localhost:3000', // change this if deploying to Render or elsewhere
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // your main server file, change if needed

swaggerAutogen(outputFile, endpointsFiles, doc);