// logs/logService.js
const { beta_client } = require('../db/cassandra/cassandraConnector');
const { aams_tables_schema } = require('../db/cassandra/cassandraSchemas');
const fs = require('fs');

const logs_table = aams_tables_schema.logs.name;



async function downloadLogs() {
  const query = `SELECT * FROM ${logs_table}`;
  try {
    const result = await client.execute(query);

    const logsJson = result.rows.map(row => {
      return {
        log_id: row.log_id,
        timestamp: row.timestamp,
        agent: row.agent,
        host: row.host, 
        message: row.message,
        ip: row.ip,
        url: row.url,
      };
    });
    
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const jsonFilePath = `logs/cassandra_logs/logs_${timestamp}.json`;

    // fs.writeFileSync(jsonFilePath, JSON.stringify(logsJson, null, 2));
    if (logsJson.length > 0) {
      fs.writeFileSync(jsonFilePath, JSON.stringify(logsJson, null, 2));
      const message = `Logs saved as JSON to ${jsonFilePath}`;
      console.log(message);
    } else {
      console.log('logsJson is empty. Skipping file write.');
    }
  } catch (error) {
    console.error('Error downloading logs:', error);
  }
}

async function deleteLogs() {
  const deleteQuery = `TRUNCATE ${logs_table}`;
  try {
    await client.execute(deleteQuery);
    const message = `Logs table truncated successfully from ${logs_table}`;
    console.log(message)
  } catch (error) {
    console.error('Error deleting logs:', error);
  }
}


module.exports = { downloadLogs, deleteLogs };
