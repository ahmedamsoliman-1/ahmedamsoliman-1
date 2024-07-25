const { LambdaClient, ListFunctionsCommand } = require('@aws-sdk/client-lambda');
const AWSManager = require('./AWSManager');
const config = require('../config');

const middleware = require('../middlewares/utils');


class LambdaManager extends AWSManager {
  constructor() {
    super();
    this.lambda = new LambdaClient({ region: config.AWS.AWS_REGION });
  }

  async listFunctions() {
    try {
      const params = {};
      const data = await this.lambda.send(new ListFunctionsCommand(params));
      return data.Functions;
    } catch (error) {
      middleware.llog(`Error listing Lambda functions:, ${error.message}`, 'red', 'error');
      return {};
    }
  }
}

module.exports = LambdaManager;
