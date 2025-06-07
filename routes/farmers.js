const router = require('express').Router();

const farmersController = require('../controllers/farmers.js');

router.get('/', farmersController.getAll);

router.get('/:id', farmersController.getSingle);

router.post('/', farmersController.createFarmer); //used to create something

router.put('/:id', farmersController.updateFarmer); //Put/Patch used to update. Can be used interchangebly

router.delete('/:id', farmersController.deleteFarmer); //removing something

module.exports = router;