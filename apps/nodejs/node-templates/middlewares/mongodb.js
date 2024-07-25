var client = require("../db/MongoDBConnector")

var middlewares = {};


middlewares.checkClient = async function(req, res, next) {
    var client = await client.getClient();
    if(client) {
        next();
    } else {
        res.status(500).send("No client found");
    }
}

middlewares.listMongoDBDatabases = async function(req, res, next) {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();
    // const dbs = databasesList.databases.forEach(db => console.log(`- ${db.name}`));

    req.databasesList = databasesList;

    next();


}

module.exports = middlewares;

