const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all farmers
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('farmers').find();
        const farmers = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(farmers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET single farmer by ID
const getSingle = async (req, res) => {
    try {
        const farmerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('farmers').find({ _id: farmerId });
        const farmers = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(farmers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST: Create new farmer
const createFarmer = async (req, res) => {
    try {
        const farmer = {
            name: req.body.name,
            email: req.body.email,
            farmName: req.body.farmName,
            location: req.body.location,
            oauthProvider: req.body.oauthProvider
        };
        const response = await mongodb.getDatabase().collection('farmers').insertOne(farmer);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Farmer created' });
        } else {
            res.status(500).json({ error: 'Failed to create farmer' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT: Update farmer by ID
const updateFarmer = async (req, res) => {
    try {
        const farmerId = new ObjectId(req.params.id);
        const farmer = {
            name: req.body.name,
            email: req.body.email,
            farmName: req.body.farmName,
            location: req.body.location,
            oauthProvider: req.body.oauthProvider
        };
        const response = await mongodb.getDatabase().collection('farmers').replaceOne({ _id: farmerId }, farmer);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Farmer not found or not updated' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE: Remove farmer by ID
const deleteFarmer = async (req, res) => {
    try {
        const farmerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('farmers').deleteOne({ _id: farmerId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Farmer not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createFarmer,
    updateFarmer,
    deleteFarmer
};