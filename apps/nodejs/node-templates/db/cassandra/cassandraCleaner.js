const { alpha_client, beta_client } = require('./cassandraConnector');





async function dropKeyspace(keyspace) {
  try {
    await client.connect();

    await client.execute(`DROP KEYSPACE IF EXISTS ${keyspace}`);

    console.table({
      status: 'Keyspace Dropped',
      keyspace: keyspace,
    });
  } catch (error) {
    console.error('Error dropping keyspace:', error);
  }
}


async function dropKeyspaceAndTable(keyspace, table) {
  try {
    await client.connect();

    await client.execute(`DROP TABLE IF EXISTS ${keyspace}.${table}`);
    await client.execute(`DROP KEYSPACE IF EXISTS ${keyspace}`);

    console.table({
      status: 'Keyspace and Table Deleted',
      keyspace: keyspace,
      table: table,
    });
  } catch (error) {
    console.error('Error dropping keyspace and table:', error);
  }
}




async function dropAllKeyspacesAndTables() {
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
        await client.execute(`DROP TABLE IF EXISTS ${keyspace}.${table}`);
        console.log(`Dropped table ${keyspace}.${table}`);
      }

      await client.execute(`DROP KEYSPACE IF EXISTS ${keyspace}`);
      console.log(`Dropped keyspace ${keyspace}`);
    }

    console.log('All keyspaces and tables deleted');
  } catch (error) {
    console.error('Error dropping keyspaces and tables:', error);
  }
}






dropAllKeyspacesAndTables()