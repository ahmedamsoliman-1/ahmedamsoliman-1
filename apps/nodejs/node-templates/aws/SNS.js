const { SNSClient, ListTopicsCommand} = require("@aws-sdk/client-sns");

const AWSManager = require('./AWSManager');

const config = require('../config');

const middlewares = require('../middlewares/utils');

const region = config.AWS.AWS_REGION;
const bucket = config.AWS.AWS_BUCKET;

class SNSManager extends AWSManager {
  constructor() {
    super();
    this.sns = new SNSClient({
      region: this.region,
      credentials: this.credentials
    });
  }

  // Implement SNS-related methods here
  async listTopics() {
    const data = await this.sns.send(new ListTopicsCommand({}));
    return data['Topics'];
  }
}

module.exports = SNSManager;
