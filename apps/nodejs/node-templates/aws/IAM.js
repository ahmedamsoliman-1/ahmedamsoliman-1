const { 
    IAMClient, 
    ListGroupsCommand, 
    ListUsersCommand, 
    ListRolesCommand 
} = require('@aws-sdk/client-iam');
const AWSManager = require('./AWSManager');
const config = require('../config');

class IAMManager extends AWSManager {
  constructor() {
    super();
    this.iam = new IAMClient({ region: config.AWS.AWS_REGION });
  }

  async listUsers() {
    try {
      const params = {};
      const data = await this.iam.send(new ListUsersCommand(params));
      return data.Users;
    } catch (error) {
      console.error('Error listing IAM users:', error);
      throw error;
    }
  }

  async listGroups() { 
    try {
      const params = {};
      const data = await this.iam.send(new ListGroupsCommand(params));
      return data.Groups;
    } catch (error) {
      console.error('Error listing IAM groups:', error);
      throw error;
    }
  }

  async listRoles() {
    try {
      const params = {};
      const data = await this.iam.send(new ListRolesCommand(params));
      return data.Roles;
    } catch (error) {
      console.error('Error listing IAM roles:', error);
      throw error;
    }
  }
}

module.exports = IAMManager;
