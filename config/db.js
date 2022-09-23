require("dotenv").config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect().then(connection => {
    console.log("Connected to the Database");
}).catch(err => console.log("Database Connection Failed", err));

module.exports = client