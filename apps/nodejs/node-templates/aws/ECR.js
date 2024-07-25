const { ECRClient, DescribeRepositoriesCommand, DescribeImagesCommand } = require('@aws-sdk/client-ecr');
const config = require('../config');
const AWSManager = require('./AWSManager');

class ECRManager extends AWSManager {
  constructor() {
    super();
    this.ecr = new ECRClient({ region: config.AWS.AWS_REGION });
  }

  async listRepositories() {
    try {
      const describeRepositoriesCommand = new DescribeRepositoriesCommand({});
      const response = await this.ecr.send(describeRepositoriesCommand);
      return response.repositories;
    } catch (error) {
      console.error('Error listing repositories:', error);
      throw error;
    }
  }

  async listImages(repositoryName) {
    try {
      const describeImagesCommand = new DescribeImagesCommand({ repositoryName });
      const response = await this.ecr.send(describeImagesCommand);
      return response.imageDetails;
    } catch (error) {
      console.error('Error listing images:', error);
      throw error;
    }
  }
}

module.exports = ECRManager;
