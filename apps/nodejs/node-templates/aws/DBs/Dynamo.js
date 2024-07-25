const { DynamoDBClient, ListTablesCommand } = require('@aws-sdk/client-dynamodb');
const AWSManager = require('../AWSManager');
const config = require('../../config');

class DynamoDB extends AWSManager {
  constructor() {
    super();
    this.dynamoDBClient = new DynamoDBClient({ region: config.AWS.AWS_REGION });
  }

  async listTables() {
    try {
      const params = {};
      const data = await this.dynamoDBClient.send(new ListTablesCommand(params));
      return data.TableNames;
    } catch (error) {
      console.error('Error listing DynamoDB tables:', error);
      throw error;
    }
  }
}

module.exports = DynamoDB;
