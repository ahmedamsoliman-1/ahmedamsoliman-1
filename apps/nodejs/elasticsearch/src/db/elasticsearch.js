const elasticsearch = require('@elastic/elasticsearch');
const fs = require('fs');
require('dotenv').config();
const ll = require('../middleware/utils');


const timeout = 3000;

let es = process.env.ELASTIC_SEARCH;
let host_1, host_2, host_3
let certificate, esuser, espasscode;
let es_index = '';

if (es === 'dev') {
  host_1 = process.env.ES_HOST_1;
  host_2 = process.env.ES_HOST_2;
  host_3 = process.env.ES_HOST_3;
  certificate = process.env.DEV_CERT;
  esuser = process.env.DEV_AK;
  espasscode = process.env.DEV_SK;
  es_index = process.env.DEV_INDEX;
}

const es_nodes = [host_1, host_2, host_3];
const client = new elasticsearch.Client({
  nodes: es_nodes,
  auth: {
    username: esuser,
    password: espasscode
  },
  tls: {
    ca: fs.readFileSync(certificate),
    rejectUnauthorized: false
  },
  requestTimeout: timeout
});


(async () => {
  try {
    await client.ping();

    const info = await client.info();
    ll.llog("Elasticsearch Connection Information:");
    console.table({
      "Host": host,
      "name": info.name,
      "clusterName": info.cluster_name,
      "clusterUUID": info.cluster_uuid,
      "version": info.version.number,
      "User": esuser,
      "Index": es_index,
    });
  } catch (error) {
    ll.llog(`Not connected, Error retrieving data from ElasticSearch! ${error.message}`, 'error');
    ll.llog(`Not connected to ${host_1, host_2, host_3}`, 'error');
  }
})();



module.exports = client;