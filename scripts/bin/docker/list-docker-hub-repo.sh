#!/bin/bash

# Docker Hub username
USERNAME="ahmedalimsolimansd"

list_repositories() {
  local url="https://hub.docker.com/v2/repositories/$USERNAME/"
  echo "Fetching list of repositories for user '$USERNAME'..."

  while [ -n "$url" ]; do
    # Fetch the list of repositories from Docker Hub API
    response=$(curl -s "$url")
    # Extract repository names from JSON response
    echo "$response" | jq -r '.results[].name'
    # Get the next page URL from the response
    url=$(echo "$response" | jq -r '.next')
  done
}

# List repositories for the specified Docker Hub user
list_repositories
