const { MongoClient } = require('mongodb');
const middleare = require('../middlewares/utils');
const config = require('../config');

const uri_ahmed = config.MONGO.MONGO_URI_AHMED;
const uri_localhost_1 = config.MONGO.MONGO_URI_MONGO_URI_LOCALHOST_1;

const client_ahmed = new MongoClient(uri_ahmed);
const client_lhost1 = new MongoClient(uri_localhost_1);

(async () => {
  try {
    await client_ahmed.connect();
    const databasesList = await client_ahmed.db().admin().listDatabases();
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'MongoDB Ahmed'`;
    const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`;
    console.log(time, connected, succ);
  } catch (error) {
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const nconnected = `- ${middleare.colorMiddleware.red}Not Connected To ${middleare.colorMiddleware.yellow}'MongoDB Ahmed'`;
    const succ = `${middleare.colorMiddleware.red}Successfully${middleare.colorMiddleware.reset}`;
    console.log(time, nconnected, succ);
  } 
})();

(async () => {
  try {
    await client_lhost1.connect();
    const databasesList = await client_lhost1.db().admin().listDatabases();
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'MongoDB Localhost'`;
    const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`;
    console.log(time, connected, succ);
  } catch (error) {
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const nconnected = `- ${middleare.colorMiddleware.red}Not Connected To ${middleare.colorMiddleware.yellow}'MongoDB Localhost'`;
    const succ = `${middleare.colorMiddleware.red}Successfully${middleare.colorMiddleware.reset}`;
    console.log(time, nconnected, succ);
  } 
})();

module.exports = { 
  client_ahmed,
  client_lhost1 
};