const router = require('express').Router();

const farmersController = require('../controllers/farmers.js');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', farmersController.getAll);

router.get('/:id', farmersController.getSingle);

router.post('/', isAuthenticated, farmersController.createFarmer); //used to create something

router.put('/:id', isAuthenticated, farmersController.updateFarmer); //Put/Patch used to update. Can be used interchangebly

router.delete('/:id', isAuthenticated, farmersController.deleteFarmer); //removing something

module.exports = router;