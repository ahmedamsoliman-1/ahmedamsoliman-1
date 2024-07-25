const es_client = require('../db/elastic');

var logService = {}


logService.logsToElastic = async function (payload) {
  return await es_client.logsToElastic(payload);
}





module.exports = logService;
