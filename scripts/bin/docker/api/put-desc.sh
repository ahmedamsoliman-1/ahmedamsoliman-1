#!/bin/bash

source "$(dirname "$0")/../../../lib/helper_functions.sh"
source "$(dirname "$0")/../../../lib/utils.sh"
source "$(dirname "$0")/../../../config/secrets.conf"

REPOSITORY_NAME="aams-nodejs-ejs-auth"
CATEGORY="Data Science"

DESCRIPTION="This is ${REPOSITORY_NAME} repository for ${REPOSITORY_NAME} docker image."

# Authenticate and get the JWT token
JWT_TOKEN=$(curl -s -X POST -H "Content-Type: application/json" \
-d '{"username": "'"$DOCKERHUB_USERNAME"'", "password": "'"$DOCKERHUB_PASSWORD"'"}' \
"https://hub.docker.com/v2/users/login/" | jq -r .token)

if [ -z "$JWT_TOKEN" ] || [ "$JWT_TOKEN" == "null" ]; then
  echo "Authentication failed. Please check your credentials."
  exit 1
fi

# Set the repository description and category
RESPONSE=$(curl -s -X PATCH "https://hub.docker.com/v2/repositories/$DOCKERHUB_USERNAME/$REPOSITORY_NAME/" \
-H "Authorization: JWT $JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
      "description": "'"$DESCRIPTION"'",
      "full_description": "'"$DESCRIPTION"'",
      "category": "'"$CATEGORY"'"
    }')

# Check if the update was successful
if echo "$RESPONSE" | grep -q "$REPOSITORY_NAME"; then
  box_text "Repository description and category updated successfully."
else
  echo "Failed to update repository description and category. Response from server:"
  log "$RESPONSE"
fi
