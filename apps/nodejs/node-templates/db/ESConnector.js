const elasticsearch = require('@elastic/elasticsearch');
const fs = require('fs');
require('dotenv').config();
const middleare = require('../middlewares/utils');
const config = require('../config');


const port = config.ES.ELASTIC_SEARCH_PORT;
const alias = config.ES.ELASTIC_SEARCH_ALIAS;
const timeout = config.ES.ELASTIC_SEARCH_REQUEST_TIME_OUT;

const dev_host = config.ES.ELASTIC_SEARCH_HOST_DEV;
const dev_certificate = config.ES.ELASTIC_SEARCH_CERT_DEV;
const dev_esuser = config.ES.ELASTIC_SEARCH_AK_DEV;
const dev_espasscode = config.ES.ELASTIC_SEARCH_SK_DEV;

const local_host = config.ES.ELASTIC_SEARCH_HOST_LOCAL;
const local_certificate = config.ES.ELASTIC_SEARCH_CERT_LOCAL;
const local_esuser = config.ES.ELASTIC_SEARCH_AK_LOCAL;
const local_espasscode = config.ES.ELASTIC_SEARCH_SK_LOCAL;

const open_search_host = config.OPENSEARCH.OPENSEARCH_HOST;
const open_search_user = config.OPENSEARCH.OPENSEARCH_USER;
const open_search_passcode = config.OPENSEARCH.OPENSEARCH_PASSCODE;
const open_search_port = config.OPENSEARCH.OPENSEARCH_PORT;
const open_search_domain = config.OPENSEARCH.OPENSEARCH_DOMAIN_NAME;

const es_client_dev = new elasticsearch.Client({
  node: `https://${dev_host}:${port}`,
  auth: {
    username: dev_esuser,
    password: dev_espasscode,
  },
  tls: {
    ca: fs.readFileSync(dev_certificate),
    rejectUnauthorized: false
  },
  requestTimeout: timeout,
});


const es_client_local = new elasticsearch.Client({
  node: `https://${local_host}:${port}`,
  auth: {
    username: local_esuser,
    password: local_espasscode,
  },
  tls: {
    ca: fs.readFileSync(local_certificate),
    rejectUnauthorized: false
  },
  requestTimeout: timeout,
});






const createIndex = async (indexName) => {
  try {
    const indexExists = await es_client_dev.indices.exists({ index: indexName });
    if (indexExists) {
      console.log(`Index '${indexName}' Already Exists`, 'yellow');
    } else {
      await es_client_dev.indices.create({
        index: indexName,
        body: {
          settings: {
            number_of_shards: 1,
            number_of_replicas: 1
          },
          mappings: {
            properties: {
              timestamp: { type: 'date' },
              method: { type: 'keyword' },
              url: { type: 'keyword' },
              full_url: { type: 'keyword' },
              ip: { type: 'ip' },
              agent: { type: 'text' },
              message: { type: 'text' },
              host: { type: 'keyword' }
            }
          }
        }
      });
      console.log(`Index '${indexName}' created successfully`, 'green');
    }

    await es_client_dev.indices.putAlias({
      index: indexName,
      name: alias
    });
    console.log(`Alias '${alias}' associated with index '${indexName}'`, 'green');

    return indexName;
  } catch (error) {
    console.error(`Error creating index '${indexName}':`, error);
    throw error;
  }
};


const createMonthlyIndexes = async () => {
  try {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'short' }).toLocaleLowerCase();
    const year = currentDate.getFullYear();
    const indexName = `${alias}_${month}_${year}`;

    await createIndex(indexName);
  } catch (error) {
    console.error('Error creating monthly indexes:', error);
    throw error;
  }
};




(async () => {
  try {
    await es_client_dev.ping();
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
    const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'Elastic Search'`
    const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`
    const loc = `at ${middleare.colorMiddleware.green}${dev_host}${middleare.colorMiddleware.reset}`
    const from = `from ${middleare.colorMiddleware.green}${middleare.nodeMiddleware}${middleare.colorMiddleware.reset}`
    console.log(time, connected, succ, loc, from);
  } catch (error) {
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
    const nconnected = `- ${middleare.colorMiddleware.red}Not Connected To Elastic Search`
    const loc = `at ${middleare.colorMiddleware.green}${dev_host}`
    const from = `from ${middleare.colorMiddleware.green}${middleare.nodeMiddleware} ${middleare.colorMiddleware.reset}`
    console.log(time, nconnected, loc, from);
  }
})();

(async () => {
  try {
    await es_client_local.ping();
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
    const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'Elastic Search'`
    const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`
    const loc = `at ${middleare.colorMiddleware.green}${local_host}${middleare.colorMiddleware.reset}`
    const from = `from ${middleare.colorMiddleware.green}${middleare.nodeMiddleware}${middleare.colorMiddleware.reset}`
    console.log(time, connected, succ, loc, from);
  } catch (error) {
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`
    const nconnected = `- ${middleare.colorMiddleware.red}Not Connected To Elastic Search`
    const loc = `at ${middleare.colorMiddleware.green}${local_host}`
    const from = `from ${middleare.colorMiddleware.green}${middleare.nodeMiddleware} ${middleare.colorMiddleware.reset}`
    console.log(time, nconnected, loc, from);
  }
})();


module.exports = {
  es_client_dev,
  es_client_local,
};