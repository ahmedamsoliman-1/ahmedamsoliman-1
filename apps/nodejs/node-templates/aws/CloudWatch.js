const { CloudWatchLogsClient, DescribeLogGroupsCommand, DescribeLogStreamsCommand, GetLogEventsCommand } = require('@aws-sdk/client-cloudwatch-logs');
const AWSManager = require('./AWSManager');
const config = require('../config');
const ll = require('../middlewares/utils');

class CloudWatch extends AWSManager {
  constructor() {
    super();
    this.cloudWatchLogs = new CloudWatchLogsClient({
      region: config.AWS.AWS_REGION
    });
  }
    
  async listLogGroups() {
    try {
      const describeLogGroupsCommand = new DescribeLogGroupsCommand({});
      const response = await this.cloudWatchLogs.send(describeLogGroupsCommand);
      return response.logGroups;
    } catch (error) {
      ll.llog(`Error listing log groups: ${error.message}`, 'red', 'error');
    }
  }

  async listLogStreams(logGroupName) {
    try {
      const describeLogStreamsCommand = new DescribeLogStreamsCommand({
        logGroupName: logGroupName,
        orderBy: 'LastEventTime',
        descending: true,
        limit: config.AWS.CLOUD_WATCH_LIMIT,
      });
      const response = await this.cloudWatchLogs.send(describeLogStreamsCommand);
      return response.logStreams;
    } catch (error) {
      ll.llog(`Error listing log groups: ${error.message}`, 'red', 'error')
    }
  }

  async getLogEvents(logGroupName, logStreamName, startTime, endTime) {
    try {
      const getLogEventsCommand = new GetLogEventsCommand({
        logGroupName: logGroupName,
        logStreamName: logStreamName,
        startTime: startTime,
        endTime: endTime,
        limit: config.AWS.CLOUD_WATCH_LIMIT,
      });
      const response = await this.cloudWatchLogs.send(getLogEventsCommand);
      return response.events;
    } catch (error) {
      ll.llog(`Error listing log groups: ${error.message}`, 'red', 'error')
    }
  }

  async listLogsAndEvents() {
    try {
        const logGroups = await this.listLogGroups();
        const logsAndEvents = [];
        
        for (const logGroup of logGroups) {
          if (true) {
            const logGroupName = logGroup.logGroupName;
            const logStreams = await this.listLogStreams(logGroupName);
            const logGroupDetails = {
              logGroupName: logGroupName,
              logStreams: []
            };
            
            for (const logStream of logStreams) {
              if (logStream.logStreamName.includes('backend')) {
                
                const logStreamName = logStream.logStreamName;
                const startTime = new Date(logStream.creationTime).getTime();
                const endTime = new Date().getTime(); // Current time
                
                const logEvents = await this.getLogEvents(logGroupName, logStreamName, startTime, endTime);
                const logStreamDetails = {
                  logStreamName: logStreamName,
                  logEvents: logEvents
                };
                
                logGroupDetails.logStreams.push(logStreamDetails);
                logsAndEvents.push(logGroupDetails);
              }
            }
            
          }
        }

        return logsAndEvents;
    } catch (error) {
      ll.llog(`Error listing log groups: ${error.message}`, 'red', 'error')
    }
}

}

module.exports = CloudWatch;
