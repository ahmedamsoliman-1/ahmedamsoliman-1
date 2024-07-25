const es_client = require('./ESConnector');
const moment = require('moment');

const config = require('../config');


const alias = config.ES.ELASTIC_SEARCH_ALIAS;
const max_retries = config.ES.ELASTIC_SEARCH_MAX_RETRIES;
const retry_interval = config.ES.ELASTIC_SEARCH_RETRY_INTERVAL; // 2 seconds

async function getRecentIndexForAlias(aliasName) {
  try {
    const response = await es_client.cat.aliases({ format: 'json' });
    let indexName;
    for (const entry of response) {
      if (entry.alias === aliasName) {
        indexName = entry.index;
        break;
      }
    }

    if (!indexName) {
      llog(`Alias '${aliasName}' not found.`);
      return null; // or throw an error if you prefer
    }

    return indexName;
  } catch (error) {
    console.error(`Error fetching recent index for alias '${aliasName}':`, error);
    throw error;
  }
}

async function logsToElastic(payload, retries = 0) {
  try {
    payload.timestamp = moment(payload.timestamp, 'MM/DD/YYYY, hh:mm:ss A').toISOString();

    let indexName = await getRecentIndexForAlias(alias);

    // Retry logic
    while (!indexName && retries < max_retries) {
      llog(`Alias '${alias}' not found. Retrying in ${retry_interval / 1000} seconds...`, 'yellow');
      await new Promise(resolve => setTimeout(resolve, retry_interval));
      indexName = await getRecentIndexForAlias(alias);
      retries++;
    }

    if (!indexName) {
      llog('Max retries exceeded. Could not fetch alias.', 'red');
      return;
    }

    // Index the log into the fetched index
    const indexResult = await es_client.index({
      index: indexName, // Use the fetched index name
      body: payload
    });
    llog('Log Indexed Successfully to Elastic Search');
  } catch (error) {
    console.error('Error Indexing Log to Elasticsearch:', error);
  }
}

module.exports = {
  logsToElastic,
};
