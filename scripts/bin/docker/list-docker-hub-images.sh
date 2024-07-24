#!/bin/bash

# Docker Hub username
USERNAME="ahmedalimsolimansd"
# Repository name
REPOSITORY="tenderd-devops-user-svc"

list_images() {
  echo "Fetching list of images for repository '$USERNAME/$REPOSITORY'..."
  # Fetch the list of tags (images) from Docker Hub API
  curl -s "https://hub.docker.com/v2/repositories/$USERNAME/$REPOSITORY/tags/" | jq -r '.results[].name'
}

# List images in the specified Docker Hub repository
list_images
