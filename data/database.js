const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db('project2'); // 👈 Use .db() to get the actual database
            console.log(`DB connected to: ${database.databaseName}`);
            callback(null, database);
        })
        .catch((err) => {
            console.error('Failed to connect to DB:', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};