const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all products
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('products').find();
        const products = await result.toArray();
        //products.forEach(p => {
            //p.price = `$${p.price.toFixed(2)}`;
        //});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET a single product
const getSingle = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection('products').find({ _id: productId });
        const product = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST: Create a product
const createProduct = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            unit: req.body.unit,
            quantityAvailable: req.body.quantityAvailable,
            description: req.body.description
        };
        const response = await mongodb.getDatabase().collection('products').insertOne(product);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Product created' });
        } else {
            res.status(500).json({ error: 'Failed to create product' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT: Update a product
const updateProduct = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            unit: req.body.unit,
            quantityAvailable: req.body.quantityAvailable,
            description: req.body.description,
        };
        const response = await mongodb.getDatabase().collection('products').replaceOne({ _id: productId }, product);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Product not found or not updated' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE: Remove a product
const deleteProduct = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().collection('products').deleteOne({ _id: productId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};
