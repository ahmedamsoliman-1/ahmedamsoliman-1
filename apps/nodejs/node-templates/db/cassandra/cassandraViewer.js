const { beta_client } = require('./cassandraConnector');









async function getAllKeyspacesAndTablesContent() {
  try {
    const keyspaces = await client.execute('SELECT * FROM system_schema.keyspaces');
    const tables = await client.execute('SELECT * FROM system_schema.tables');

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

      keyspaceTableMap[keyspaceName].push(tableName);
    }

    for (const keyspace in keyspaceTableMap) {
      const tablesInKeyspace = keyspaceTableMap[keyspace];

      for (const table of tablesInKeyspace) {
        getCassandraTablesContent(keyspace, table)
      }
    }

  } catch (error) {
    console.error('Error dropping keyspaces and tables:', error);
  }
}






getKeyspacesAndTables = async function () {
  try {
    const keyspaces = await client.execute('SELECT * FROM system_schema.keyspaces');
    const tables = await client.execute('SELECT * FROM system_schema.tables');

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

    console.log(keyspaceTableMap)
  } catch (error) {
    console.error('Error in getKeyspacesAndTables:', error);
  }
};





getCassandraTablesContent = async (keyspace, table) => {
  try {
    await client.execute(`USE ${keyspace}`)

    const query = `SELECT * FROM ${table}`;
    const result = await client.execute(query);
    console.log(result)
  } catch (error) {
    console.error('Error in getCassandraTablesContent:', error);
  }
};



getAllKeyspacesAndTablesContent()