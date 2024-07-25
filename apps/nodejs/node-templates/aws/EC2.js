const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');
const AWSManager = require('./AWSManager');
const config = require('../config');

class EC2Manager extends AWSManager {
  constructor() {
    super();
    this.ec2 = new EC2Client({ region: config.AWS.AWS_REGION });
  }

  async listInstances() {
    try {
      const params = {};
      const data = await this.ec2.send(new DescribeInstancesCommand(params));
      return data.Reservations.reduce((instances, reservation) => {
        return instances.concat(reservation.Instances);
      }, []);
    } catch (error) {
      console.error('Error listing EC2 instances:', error);
      throw error;
    }
  }
}

module.exports = EC2Manager;
