const { client } = require('./cassandraConnector');
const middleare = require('../../middlewares/utils');


async function createKeyspace(keyspace, factor, strategy) {
  try {
    await client.connect();

    const query = `CREATE KEYSPACE IF NOT EXISTS ${keyspace} WITH replication = { 'class': '${strategy}', 'replication_factor': ${factor} }`;
    await client.execute(query);
    const time_temp = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const k_temp = `- Keyspace ${middleare.colorMiddleware.yellow}'${keyspace}'${middleare.colorMiddleware.reset}`;
    const created_temp = `${middleare.colorMiddleware.cyan}Created Successfully${middleare.colorMiddleware.reset}`;
    const replica = `with ${middleare.colorMiddleware.yellow}'${factor}'${middleare.colorMiddleware.reset} replication factor, ${middleare.colorMiddleware.yellow}'${strategy}'${middleare.colorMiddleware.reset} class`;

    console.log(`${time_temp} ${k_temp} ${created_temp} ${replica}`);
  } catch (error) {
    const time_temp = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const k_temp = `- Keyspace ${middleare.colorMiddleware.red}'${keyspace}'${middleare.colorMiddleware.reset}`;
    const created_temp = `${middleare.colorMiddleware.red}Created Successfully${middleare.colorMiddleware.reset}`;
    const replica = `with ${middleare.colorMiddleware.red}'${factor}'${middleare.colorMiddleware.reset} replication factor, ${middleare.colorMiddleware.yellow}'${strategy}'${middleare.colorMiddleware.reset} class`;

    console.log(`${time_temp} ${k_temp} ${created_temp} ${replica}`);
  }
}

async function createTable(keyspace, table, schema) {
  try {
    await client.execute(`USE ${keyspace}`);

    await client.execute(
      `CREATE TABLE IF NOT EXISTS ${table} ${schema}`
    );


    const time_temp = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const table_temp = `- Table ${middleare.colorMiddleware.green}'${table}'${middleare.colorMiddleware.reset}`;
    const key_temp = `in Keyspace ${middleare.colorMiddleware.yellow}'${keyspace}'${middleare.colorMiddleware.reset}`;
    const created_temp = `${middleare.colorMiddleware.cyan}Created Successfully${middleare.colorMiddleware.reset}`;
    
    const message = `${time_temp} ${table_temp} ${key_temp} ${created_temp}`
    console.log(message);
  } catch (error) {
    const time_temp = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const table_temp = `- Table ${middleare.colorMiddleware.red}'${table}'${middleare.colorMiddleware.reset}`;
    const key_temp = `in Keyspace ${middleare.colorMiddleware.yellow}'${keyspace}'${middleare.colorMiddleware.reset}`;
    const created_temp = `${middleare.colorMiddleware.red}Not Created Successfully${middleare.colorMiddleware.reset}`;
    
    const message = `${time_temp} ${table_temp} ${key_temp} ${created_temp}`
    console.log(message);
  }
}


module.exports = {
  createKeyspace,
  createTable,
}