var { alpha_client, beta_client } = require("../db/cassandra/cassandraConnector")

var middlewares = {};


middlewares.getKeyspacesAndTables = async function(req, res, next) {
  try {
    const which_cassandra = req.query.which_cassandra;
    if (!which_cassandra) {
      return res.status(400).json({ error: 'Keyspace name is required' }); 
    }

    if (which_cassandra === 'alpha') {
      client = alpha_client;
    } else if (which_cassandra === 'beta') {
      client = beta_client;
    }

    const keyspaces = await client.execute("SELECT * FROM system_schema.keyspaces");
    const tables = await client.execute("SELECT * FROM system_schema.tables");

    const keyspaceTableMap = {};

    for (const row of tables.rows) {
      if (row.keyspace_name.startsWith('system')) {
        continue; // Skip system-related keyspaces and tables
      }
      
      if (!keyspaceTableMap[row.keyspace_name]) {
        keyspaceTableMap[row.keyspace_name] = [];
      }

      const tableName = row.table_name;
      const keyspaceName = row.keyspace_name;

      // Fetch count of documents/rows for each table
      const countQuery = `SELECT COUNT(*) FROM ${keyspaceName}.${tableName}`;
      const countResult = await client.execute(countQuery);
      const rowCount = countResult.rows[0]['count'];

      keyspaceTableMap[keyspaceName].push({
        table_name: tableName,
        row_count: rowCount
      });
    }

    req.nonSystemKeyspacesWithTables = keyspaceTableMap;
    next();
  } catch (error) {
    console.error('Error retrieving non-system keyspaces and tables:', error);
    res.status(500).json({ error: error.message });
  }
};

middlewares.getTablesinKeyspace = async (req, res, next) => {
  try {
    const keyspace = req.query.keyspace;
    if (!keyspace) {
      return res.status(400).json({ error: 'Keyspace name is required' }); 
    }

    const query = `SELECT * FROM system_schema.tables WHERE keyspace_name = '${keyspace}'`;

    const tables = await client.execute(query);

    res.status(200).json({ tables: tables.rows }); // Respond with the fetched tables
  } catch (error) {
    console.error('Error retrieving Cassandra tables:', error);
    res.status(500).json({ error: error.message });
  }
};

middlewares.getCassandraTablesContent = async (req, res, next) => {
  try {
    const keyspace = req.query.keyspace;
    const table = req.query.table;

    if (!keyspace || !table) {
      return res.status(400).json({ error: 'Keyspace and Table name is required' }); 
    }

    // const use_query = `USE ${keyspace}`;
    // await client.execute(use_query);
    const query = `SELECT * FROM ${keyspace}.${table}`;
    const result = await client.execute(query);
    req.result = result;
    next();
  } catch (error) {
    console.error('Error retrieving Cassandra tables:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = middlewares;