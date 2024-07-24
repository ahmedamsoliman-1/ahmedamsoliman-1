#!/bin/bash

# Set your ECS cluster name and log group name
ECS_CLUSTER_NAME="cs2-platform-cluster"
LOG_GROUP_NAME="/ecs/cs2-platform"
AWS_REGION="me-central-1"
AWS_PROFILE="chess"

# Get the task ARNs from the ECS cluster
TASKS=$(aws ecs list-tasks --cluster $ECS_CLUSTER_NAME --region $AWS_REGION --profile $AWS_PROFILE --query 'taskArns' --output text)

# Loop through each task to retrieve logs
for TASK_ARN in $TASKS; do
    # Get the container instance ARN for the task
    CONTAINER_INSTANCE_ARN=$(aws ecs describe-tasks --cluster $ECS_CLUSTER_NAME --tasks $TASK_ARN --region $AWS_REGION --profile $AWS_PROFILE --query 'tasks[0].containerInstanceArn' --output text)

    # Get the container instance ID from the ARN
    CONTAINER_INSTANCE_ID=$(basename "$CONTAINER_INSTANCE_ARN")

    # Get the EC2 instance ID associated with the container instance
    EC2_INSTANCE_ID=$(aws ecs describe-container-instances --cluster $ECS_CLUSTER_NAME --container-instances $CONTAINER_INSTANCE_ID --region $AWS_REGION --profile $AWS_PROFILE --query 'containerInstances[0].ec2InstanceId' --output text)

    # Get the log stream names for the task
    LOG_STREAMS=$(aws logs describe-log-streams --log-group-name $LOG_GROUP_NAME --region $AWS_REGION --profile $AWS_PROFILE --query "logStreams[?contains(logStreamName,'$EC2_INSTANCE_ID/$TASK_ARN')].logStreamName" --output text)

    # Print the logs for each log stream
    for LOG_STREAM in $LOG_STREAMS; do
        echo "Logs for $LOG_STREAM:"
        aws logs get-log-events --log-group-name $LOG_GROUP_NAME --log-stream-name $LOG_STREAM --region $AWS_REGION --profile $AWS_PROFILE --output text --query 'events[*].message'
        echo "---------------------------------------------------"
    done
done
