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
USER="ahmedamsoliman-1"
REPO="Tenderd-DevOps-Assignement-1"

list_secrets() {
  box_text "Secrets for repository $1:"
  gh secret list -R $1
  echo ""
}

list_environments() {
  box_text "Environments for repository $1:"
  gh api -H "Accept: application/vnd.github.v3+json" /repos/$1/environments | jq -r '.environments[].name'
  echo ""
}

list_actions() {
  box_text "Actions for repository $1:"
  gh api -H "Accept: application/vnd.github.v3+json" /repos/$1/actions/workflows | jq -r '.workflows[].name'
  echo ""
}

list_branches() {
    box_text "Branches for repository $1:"
    gh api -H "Accept: application/vnd.github.v3+json" /repos/$1/branches | jq -r '.[].name'
    echo ""
}

# # List secrets, environments, and actions for the organization repository
# ORG_REPO="$ORG/$REPO"
# box_text "Fetching details for organization repository '$ORG_REPO'..."
# list_secrets $ORG_REPO
# list_environments $ORG_REPO
# list_actions $ORG_REPO

# List secrets, environments, and actions for the personal repository
USER_REPO="$USER/$REPO"
box_text "Fetching details for personal repository '$USER_REPO'..."
list_secrets $USER_REPO
list_environments $USER_REPO
list_actions $USER_REPO
