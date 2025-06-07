const router = require('express').Router();

const productsController = require('../controllers/products.js');

router.get('/', productsController.getAll);

router.get('/:id', productsController.getSingle);

router.post('/', productsController.createProduct); //used to create something

router.put('/:id', productsController.updateProduct); //Put/Patch used to update. Can be used interchangebly

router.delete('/:id', productsController.deleteProduct); //removing something

module.exports = router;