#!/bin/bash

# Source necessary scripts and configuration
source "$(dirname "$0")/../../../lib/helper_functions.sh"
source "$(dirname "$0")/../../../lib/utils.sh"
source "$(dirname "$0")/../../../config/secrets.conf"

# Authenticate with Docker Hub and obtain a token
TOKEN=$(curl -s -H "Content-Type: application/json" -X POST -d '{"username": "'$DOCKER_USERNAME'", "password": "'$DOCKER_PASSWORD'"}' https://hub.docker.com/v2/users/login/ | jq -r .token)

# Function to list image tags for a given repository
list_image_tags() {
  local repo_name=$1
  curl -s -H "Authorization: JWT $TOKEN" "https://hub.docker.com/v2/repositories/$DOCKER_USERNAME/$repo_name/tags/?page_size=100" | jq -r '.results[] | .name' | paste -sd, -
}

# Function to list repositories and include image tags in the last column
list_docker_hub_repos() {
  # Print table header
  printf "%-35s %-12s %-10s %-60s\n" "REPOSITORY" "PULL COUNT" "STAR COUNT" "TAGS"
  echo "---------------------------------------------------------------------------------------------------------------"

  # Fetch the list of repositories
  curl -s -H "Authorization: JWT $TOKEN" "https://hub.docker.com/v2/repositories/$DOCKER_USERNAME/?page_size=100" | jq -r '.results[] | [.name, .pull_count, .star_count] | @tsv' | while IFS=$'\t' read -r name pull_count star_count; do
    tags=$(list_image_tags "$name")
    printf "%-35s %-12s %-10s %-60s\n" "$name" "$pull_count" "$star_count" "$tags"
  done
}

# Redirect output to a file
list_docker_hub_repos > $$HOME/workspace/ahmed/ahmedamsoliman-1/scripts/bin/docker/api/list-repo.txt
