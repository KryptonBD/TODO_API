const mongoClient = require('mongodb').MongoClient;
require("dotenv").config();
// const url = process.env.MONGO_URI;
const CONNECTION_URL = process.env.CONNECTION_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

let _db;
module.exports = {
    connectToServer: function (callback) {
        mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true },
            function (err, client) {
            _db = client.db(DATABASE_NAME);
            console.log('Connected to database: ' + DATABASE_NAME);
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    }
};