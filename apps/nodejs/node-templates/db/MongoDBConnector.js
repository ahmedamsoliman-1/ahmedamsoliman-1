// const { MongoClient } = require('mongodb');
// const middleare = require('../middlewares/utils');
// const config = require('../config');

// const uri = config.MONGO.MONGO_URI;

// const client = new MongoClient(uri);

// (async () => {
//   try {
//     await client.connect();
//     const databasesList = await client.db().admin().listDatabases();

//     const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
//     const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'MongoDB'`;
//     const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`;
//     console.log(time, connected, succ);
//   } catch (error) {
//     const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
//     const nconnected = `- ${middleare.colorMiddleware.red}Not Connected To ${middleare.colorMiddleware.yellow}'MongoDB'`;
//     const succ = `${middleare.colorMiddleware.red}Successfully${middleare.colorMiddleware.reset}`;
//     console.log(time, nconnected, succ);
//   } 
// })();

// module.exports = client;