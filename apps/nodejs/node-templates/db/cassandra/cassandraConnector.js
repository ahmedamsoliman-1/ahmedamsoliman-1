const { Client } = require('cassandra-driver');
require('dotenv').config();
const moment = require('moment');

const nowMiddleware = moment().format('MM/DD/YYYY, h:mm:ss A');
const config = require('../../config');

const datacenter = config.CASSANDRA.CASSANDRA_DATACENTER;
const alpha_host = config.CASSANDRA.CASSANDRA_HOST_ALPHA;
const beta_host = config.CASSANDRA.CASSANDRA_HOST_BETA;
const local_host = config.CASSANDRA.CASSANDRA_LOCALHOST;


colorMiddleware = {
  magenta: '\x1b[35m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
}


const client = new Client({
  contactPoints: [local_host],
  localDataCenter: datacenter,
});


(async () => {
  try {
    await client.connect();

    const query = 'SELECT * FROM system.local';
    const result = await client.execute(query);

    const cassandraVersion = result.rows[0].release_version;
    const cqlVersion = result.rows[0].cql_version;
    const clusterName = result.rows[0].cluster_name;

    const time = `${colorMiddleware.magenta}${nowMiddleware}${colorMiddleware.reset}`
    const connected = `- ${colorMiddleware.cyan}Connected To ${colorMiddleware.yellow}'Localhost Cassandra'`
    const info = `${colorMiddleware.cyan}Cassandra Version ${colorMiddleware.yellow}${cassandraVersion}${colorMiddleware.reset} Cluster Name ${colorMiddleware.yellow}${clusterName}${colorMiddleware.reset} `
    const succ = `${colorMiddleware.cyan}Successfully${colorMiddleware.reset}`
    const loc = `at ${colorMiddleware.green}${local_host} ${colorMiddleware.reset}in ${colorMiddleware.green}${datacenter}`
    console.log(time, connected, info, succ, loc);
  } catch (error) {
    const time = `${colorMiddleware.magenta}${nowMiddleware}${colorMiddleware.reset}`
    const nconnected = `- ${colorMiddleware.red}Not Connected To ${colorMiddleware.yellow}'Localhost Cassandra'`
    const loc = `at ${colorMiddleware.red}${local_host} ${colorMiddleware.reset}in ${colorMiddleware.green}${datacenter}`
    console.log(time, nconnected, loc);
  }
})();




module.exports = {
  client,
};

