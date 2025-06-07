const mongodb = require('../data/database');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('farmers').find();
    result.toArray().then((farmers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(farmers);
    });
};

const getSingle = async (req, res) => {
    const farmerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('farmers').find({_id: farmerId});
    result.toArray().then((farmers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(farmers);
    });
};

const createFarmer = async(req, res) => {
    const farmer = {
        name: req.body.name,
        email: req.body.email,
        farmName: req.body.farmName,
        location: req.body.location,
        oauthProvider: req.body.oauthProvider
    };
    const response = await mongodb.getDatabase().db().collection('farmers').insertOne(farmer);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the farmer.');
    }
};

const updateFarmer = async(req, res) => {
    const farmerId = new ObjectId(req.params.id);
    const farmer = {
        name: req.body.name,
        email: req.body.email,
        farmName: req.body.farmName,
        location: req.body.location,
        oauthProvider: req.body.oauthProvider
    };
    const response = await mongodb.getDatabase().db().collection('farmers').replaceOne({_id: farmerId }, farmer);
    if (response.modifiedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the farmer.');
    }
};

const deleteFarmer = async(req, res) => {
    const farmerId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('farmers').deleteOne({_id: farmerId });
    if (response.deletedCount > 0 ) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the farmer.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createFarmer,
    updateFarmer,
    deleteFarmer
};