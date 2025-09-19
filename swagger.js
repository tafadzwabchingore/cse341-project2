const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Bookstore API",
    description: "API documentation for Authors and Books",
  },
  host: "localhost:3000", // match your server port
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"]; // entry point that imports routes

swaggerAutogen(outputFile, endpointsFiles, doc);