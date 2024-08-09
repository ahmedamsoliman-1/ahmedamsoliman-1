var { client_ahmed, client_lhost1 } = require("../db/MongoDBConnector")

var middlewares = {};


// middlewares.checkClient = async function(req, res, next) {
//     var client = await client.getClient();
//     if(client) {
//         next();
//     } else {
//         res.status(500).send("No client found");
//     }
// }

middlewares.listMongoDBDatabasesAhmed = async function(req, res, next) {
    await client_ahmed.connect();
    const databasesList = await client_ahmed.db().admin().listDatabases();
    req.databasesList = databasesList;
    next();
}

middlewares.listMongoDBDatabasesLHost1 = async function(req, res, next) {
    await client_lhost1.connect();
    const databasesList = await client_lhost1.db().admin().listDatabases();
    req.databasesList = databasesList;
    next();
}

module.exports = middlewares;

