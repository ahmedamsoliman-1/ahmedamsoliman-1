#!/bin/bash

source "$(dirname "$0")/../../lib/helper_functions.sh"
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"


# Check if gh CLI is installed
if ! command -v gh &> /dev/null
then
    echo "gh CLI could not be found. Please install it from https://cli.github.com/"
    exit 1
fi

# Hardcoded organization name
ORG="ahmedsud"

# Fetch the list of all repositories for the organization
echo "Fetching list of repositories for organization '$ORG'..."
repos=$(gh repo list $ORG --limit 1000 --json nameWithOwner -q '.[].nameWithOwner')

# Display the results
box_text "Repositories for organization '$ORG':"
for repo in ${repos[@]}; do
  echo "$repo"
done

# Display the total count
total_repos=$(echo "$repos" | wc -l | xargs)
box_text "Total repositories in organization '$ORG' are $total_repos"
