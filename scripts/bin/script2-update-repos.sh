#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/../lib/helper_functions.sh"
source "$(dirname "$0")/../lib/utils.sh"

# Load configurations
source "$(dirname "$0")/../config/config_file.conf"


# Define the starting directory
START_DIR="/Users/ahmed.soliman/workspace/ahmed/ai"

# Function to find and process git repositories
process_git_repos() {
  local DIR=$1

  # Check if the directory contains a .git folder
  if [ -d "$DIR/.git" ]; then
    box_text "$DIR"
    log "Processing git repository in: $DIR"
    echo "Processing git repository in: $DIR"
    cd "$DIR" || exit
    git checkout develop
    cd - > /dev/null || exit
  fi

  # Loop through all items in the directory
  for ITEM in "$DIR"/*; do
    if [ -d "$ITEM" ]; then
      process_git_repos "$ITEM"
    fi
  done
}

# Start the process
process_git_repos "$START_DIR"

