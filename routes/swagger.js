const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('../swagger.json');

//router.use('/api-docs', swaggerUi.serve);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;