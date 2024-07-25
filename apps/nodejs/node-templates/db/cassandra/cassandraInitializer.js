const { createKeyspace, createTable } = require('./cassandraCreater');
const middleware = require('../../middlewares/utils')
const { keyspaces } = require('./cassandraSchemas')

// console.log(keyspaces)

const cassandras = [
  'localhost'
];

async function createDatabaseSchema() {
  for (const keyspace in keyspaces) {
    const keyspace_name = keyspaces[keyspace].name;
    const num_of_rep_factor = JSON.parse(keyspaces[keyspace].replication.replace(/'/g, '"')).replication_factor;
    const strategy_class = JSON.parse(keyspaces[keyspace].replication.replace(/'/g, '"')).class;
    
    await createKeyspace(
      keyspace_name,
      num_of_rep_factor,
      strategy_class,
    );
 
    for (const tableKey in keyspaces[keyspace].tables) {
      const table = keyspaces[keyspace].tables[tableKey].name;
      const schema = keyspaces[keyspace].tables[tableKey].schema;
      await createTable(keyspace_name, table, schema);
    }
  }
}
 
 
createDatabaseSchema()
  .then(() => {
    const time_temp = `${middleware.colorMiddleware.magenta}${middleware.nowMiddleware}${middleware.colorMiddleware.reset}`;
    const message = ` - ${middleware.colorMiddleware.yellow}All Tables Created/Updated Successfully${middleware.colorMiddleware.reset}`
    console.log(`${time_temp}${message}`);
  })
  .catch((error) => {
    console.error('Error creating schema: ', error);
    process.exit(1);
  });
