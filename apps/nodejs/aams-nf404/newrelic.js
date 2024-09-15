
const middlewares = require('./utils/middlewares');
const config = require('./utils/config');
const utils = require('./utils/utils');

const new_relic_app_name = config.APP_NAME;
const new_relic_app_name_env = `${new_relic_app_name}-ENV::${config.APP_ENVIRONMENT}`
const new_relic_app_name_host = `${new_relic_app_name}-HOST::${utils.node}`
const new_relic_app_name_env_host = `${new_relic_app_name}-ENV-HOST::${config.APP_ENVIRONMENT}-${utils.node}`

middlewares.llog(`New Relic Loaded from host ${utils.node} :: App Name ${new_relic_app_name}`, 'cyan', 'relic');
middlewares.llog(`New Relic Loaded from host ${utils.node} :: App Name ${new_relic_app_name_env}`, 'cyan', 'relic');
middlewares.llog(`New Relic Loaded from host ${utils.node} :: App Name ${new_relic_app_name_host}`, 'cyan', 'relic');
middlewares.llog(`New Relic Loaded from host ${utils.node} :: App Name ${new_relic_app_name_env_host}`, 'cyan', 'relic');

exports.config = {
  app_name: [
    new_relic_app_name,
    new_relic_app_name_env,
    new_relic_app_name_host
  ],
  license_key: config.DEV_NEW_RELIC_ACCESS_KEY,
  logging: {
    level: 'info'
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
