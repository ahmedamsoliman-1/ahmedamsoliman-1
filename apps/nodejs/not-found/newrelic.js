
const ll = require('./middleware/utils');
const node_name = require('os').hostname();
require('dotenv').config();


const new_relic_app_name = `NotFound`;
const new_relic_app_name_env = `${new_relic_app_name}-ENV::${process.env.ENVIRONMENT}`
const new_relic_app_name_host = `${new_relic_app_name}-HOST::${node_name}`
const new_relic_app_name_env_host = `${new_relic_app_name}-ENV-HOST::${process.env.ENVIRONMENT}-${node_name}`

ll.llog(`New Relic Loaded from host ${node_name} :: App Name ${new_relic_app_name}`, 'cyan', 'relic');
ll.llog(`New Relic Loaded from host ${node_name} :: App Name ${new_relic_app_name_env}`, 'cyan', 'relic');
ll.llog(`New Relic Loaded from host ${node_name} :: App Name ${new_relic_app_name_host}`, 'cyan', 'relic');
ll.llog(`New Relic Loaded from host ${node_name} :: App Name ${new_relic_app_name_env_host}`, 'cyan', 'relic');

exports.config = {
  app_name: [
    new_relic_app_name,
    new_relic_app_name_env,
    new_relic_app_name_host
  ],
  license_key: process.env.DEV_NEW_RELIC_ACCESS_KEY,
  logging: {
    level: process.env.NEW_RELIC_LOGGING_LEVEL_INFO
  },
  allow_all_headers: true,
  attributes: {
    /**
     * Prefix of attributes to exclude from all destinations. Allows * as wildcard
     * at end.
     *
     * NOTE: If excluding headers, they must be in camelCase form to be filtered.
     *
     * @name NEW_RELIC_ATTRIBUTES_EXCLUDE
     */
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'request.headers.x*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
      'response.headers.x*'
    ]
  }
}
