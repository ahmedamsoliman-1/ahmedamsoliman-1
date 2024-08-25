#!/bin/bash


source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"

API_KEY=apiKey=ASIAQRQDVJTJCRPIAG6T32

endpoints=(
  "http://localhost:3001"
  "https://alpha-backend.infinitychess.com"
  "https://beta-backend.infinitychess.com"
)

# Define HTTP method (GET, POST, etc.)
method="GET"

# Define headers (optional)
headers=(
  "Content-Type: application/json"
  "Authorization: Bearer YOUR_ACCESS_TOKEN"
)

# Function to make the API call
make_api_call() {
  local url=$1
  local log_file="logs/$(echo "$url" | sed 's/[^a-zA-Z0-9]/_/g').log"
  local error_file="logs/$(echo "$url" | sed 's/[^a-zA-Z0-9]/_/g')_error.log"

  # Construct the curl command
  curl_cmd="curl -X $method \"$url\""

#   # Add headers to curl command
#   for header in "${headers[@]}"; do
#     curl_cmd+=" -H \"$header\""
#   done

  # Execute the curl command and log the output
  echo "Making API call to $url"
  eval "$curl_cmd" >"$log_file" 2>"$error_file"

  # Check for errors
  if [ $? -eq 0 ]; then
    echo "API call to $url succeeded, response logged in $log_file"
  else
    echo "API call to $url failed, errors logged in $error_file"
  fi
}

# Create a logs directory if it doesn't exist
mkdir -p logs

# Iterate over all endpoints and make API calls
for endpoint in "${endpoints[@]}"; do
  make_api_call "$endpoint"
done
