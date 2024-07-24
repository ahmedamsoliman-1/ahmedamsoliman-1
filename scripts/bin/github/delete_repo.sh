#!/bin/bash

source "$(dirname "$0")/../../lib/helper_functions.sh"
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"



# gh auth refresh -h github.com -s delete_repo


# Check if gh CLI is installed
if ! command -v gh &> /dev/null
then
    echo "gh CLI could not be found. Please install it from https://cli.github.com/"
    exit 1
fi

# Hardcoded organization name
ORG="ahmedsud"
USER="ahmedamsoliman-1"
REPO="reactapps"


delete_repo() {
  echo "Deleting repository $1..."
  gh repo delete $1 --yes
  if [ $? -eq 0 ]; then
    box_text "Repository $1 deleted successfully."
  else
    box_text "Failed to delete repository $1."
  fi
}

# # Delete the organization repository
# ORG_REPO="$ORG/$REPO"
# box_text "Attempting to delete organization repository '$ORG_REPO'..."
# delete_repo $ORG_REPO

# Delete the personal repository
USER_REPO="$USER/$REPO"
echo "Attempting to delete personal repository '$USER_REPO'..."
delete_repo $USER_REPO

