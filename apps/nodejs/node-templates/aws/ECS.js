const AWSManager = require('./AWSManager');
const { ECSClient, ListClustersCommand, ListServicesCommand, ListTasksCommand, DescribeContainerInstancesCommand, DescribeTasksCommand } = require('@aws-sdk/client-ecs');
const config = require('../config');

const middlewares = require('../middlewares/utils');

class ECSManager extends AWSManager {
  constructor() {
    super();
    this.ecs = new ECSClient({
      region: config.AWS.AWS_REGION
    });
  }

  async listClustersWithDetails() {
    try {
      const clusters = await this.listClusters();
      const clusterDetails = [];

      for (const clusterArn of clusters) {
        const services = await this.listServices(clusterArn);
        const tasks = await this.listTasks(clusterArn);
        const tasksDescriptions = await this.describeTasks(clusterArn, tasks);

        const clusterDetail = {
          clusterArn,
          services,
          tasks: tasksDescriptions,
        };

        clusterDetails.push(clusterDetail);
      }

      return clusterDetails;
    } catch (error) {
      console.error('Error listing clusters with details:', error);
      throw error;
    }
  }

  async describeContainerInstances(clusterArn, containerInstanceArns) {
    try {
      const describeContainerInstancesCommand = new DescribeContainerInstancesCommand({
        cluster: clusterArn,
        containerInstances: containerInstanceArns
      });
      const response = await this.ecs.send(describeContainerInstancesCommand);
      return response.containerInstances;
    } catch (error) {
      console.error('Error describing container instances:', error);
      throw error;
    }
  }

  async describeTasks(clusterArn, taskArns) {
    try {
      const describeTasksCommand = new DescribeTasksCommand({
        cluster: clusterArn,
        tasks: taskArns
      });
      const response = await this.ecs.send(describeTasksCommand);
      return response.tasks;
    } catch (error) {
      console.error('Error describing tasks:', error);
      throw error;
    }
  }

  async listClusters() {
    try {
      const listClustersCommand = new ListClustersCommand({});
      const response = await this.ecs.send(listClustersCommand);
      return response.clusterArns;
    } catch (error) {
      console.error('Error listing clusters:', error);
      throw error;
    }
  }

  async listServices(clusterArn) {
    try {
      const listServicesCommand = new ListServicesCommand({
        cluster: clusterArn
      });
      const response = await this.ecs.send(listServicesCommand);
      return response.serviceArns;
    } catch (error) {
      console.error('Error listing services:', error);
      throw error;
    }
  }

  async listTasks(clusterArn) {
    try {
      const listTasksCommand = new ListTasksCommand({
        cluster: clusterArn
      });
      const response = await this.ecs.send(listTasksCommand);
      return response.taskArns;
    } catch (error) {
      console.error('Error listing tasks:', error);
      throw error;
    }
  }

}

module.exports = ECSManager;

