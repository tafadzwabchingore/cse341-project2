const router = require('express').Router();

const productsController = require('../controllers/products.js');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/', isAuthenticated, productsController.createProduct); //used to create something

router.put('/:id', isAuthenticated, productsController.updateProduct); //Put/Patch used to update. Can be used interchangebly

router.delete('/:id', isAuthenticated, productsController.deleteProduct); //removing something

module.exports = router;