const { CloudFormationClient, DescribeStacksCommand } = require('@aws-sdk/client-cloudformation');
const AWSManager = require('./AWSManager');
const config = require('../config');

const middleware = require('../middlewares/utils');

class CloudFormation extends AWSManager {
  constructor() {
    super();
    this.cloudFormation = new CloudFormationClient({
      region: config.AWS.AWS_REGION
    });
  }

  async listStacksDetails() {
    try {
      const describeStacksCommand = new DescribeStacksCommand({});
      const response = await this.cloudFormation.send(describeStacksCommand);
      return response.Stacks;
    } catch (error) {
      middleware.llog(`Error listing stacks: ${error.error}`, 'red', 'error');
      return {};
    }
  }
  
}

module.exports = CloudFormation;
