#!/bin/bash

box_text() {
  local text="$1"
  local color="${2:-32}" # Default to green if no color is specified
  local padding=40

  # Calculate text length and total width of the box
  local text_length=${#text}
  local box_width=$((text_length + padding * 2))

  # Top border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"

  # Text with padding
  echo -e "\033[${color}m$(printf '%*s' "$padding" '')$text$(printf '%*s' "$padding" '')\033[0m"

  # Bottom border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"
}

# fb73e90780c1




PROFILE=dev
REGION=me-central-1
CLUSTER=test-ecs-anywhere
LAUNCH_TYPE=EXTERNAL

TASK_DEFINITION_FAMILY=test-task-definition-1
SERVICE_NAME=test-service-1

DESIRED_COUNT=5

# box_text "Sanity Check"
# aws ecs --profile $PROFILE --region $REGION list-clusters
# aws ecs --profile $PROFILE --region $REGION list-services --cluster $CLUSTER --launch-type $LAUNCH_TYPE
# aws ecs --profile $PROFILE --region $REGION list-tasks --cluster $CLUSTER




# box_text " Register a new task definition"
# TASK_DEFINITION=$(aws ecs register-task-definition \
#   --profile $PROFILE \
#   --region $REGION \
#   --cli-input-json tasks/file://task.json)


# box_text "Create a new service"
# aws ecs create-service \
#   --profile $PROFILE \
#   --region $REGION \
#   --cluster $CLUSTER \
#   --service-name $SERVICE_NAME \
#   --task-definition "$TASK_DEFINITION_FAMILY":1 \
#   --desired-count 1 \
#   --launch-type $LAUNCH_TYPE

# box_text "Update Service"
# aws ecs update-service \
#   --profile $PROFILE \
#   --region $REGION \
#   --cluster $CLUSTER \
#   --service $SERVICE_NAME \
#   --task-definition $TASK_DEFINITION_FAMILY:2 \
#   --desired-count $DESIRED_COUNT


# box_text "Check Status"
# aws ecs --profile $PROFILE --region $REGION describe-services --cluster $CLUSTER --services $SERVICE_NAME




# box_text "Stop Service"
# aws ecs update-service \
#   --profile $PROFILE \
#   --region $REGION \
#   --cluster $CLUSTER \
#   --service $SERVICE_NAME \
#   --desired-count 0

# box_text "Delete Service" 
# aws ecs delete-service \
#   --profile $PROFILE \
#   --region $REGION \
#   --cluster $CLUSTER \
#   --service $SERVICE_NAME

box_text "Delete Task Definition"
aws ecs deregister-task-definition \
  --profile $PROFILE \
  --region $REGION \
  --task-definition "$TASK_DEFINITION_FAMILY":1

aws ecs deregister-task-definition \
  --profile $PROFILE \
  --region $REGION \
  --task-definition "$TASK_DEFINITION_FAMILY":2


# box_text "Check Status"
# aws ecs --profile $PROFILE --region $REGION describe-services --cluster $CLUSTER --services $SERVICE_NAME



box_text "Sanity Check"
aws ecs --profile $PROFILE --region $REGION list-clusters
aws ecs --profile $PROFILE --region $REGION list-services --cluster $CLUSTER --launch-type $LAUNCH_TYPE
aws ecs --profile $PROFILE --region $REGION list-tasks --cluster $CLUSTER