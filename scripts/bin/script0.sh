#!/bin/bash

# bin/main_script.sh


# Source the helper functions and configuration
source "$(dirname "$0")/../lib/utils.sh"
source "$(dirname "$0")/../config/config.sh"

# Set initial Git configuration
git config user.name "$GIT_USER_NAME"
git config user.email "$GIT_USER_EMAIL"

cd ..


# Fetch location information
city=$(curl -s ipinfo.io/city)
country=$(curl -s ipinfo.io/country)

# Display location in a box
box_text "$country"

# Get the name of the current branch
branch=$(git symbolic-ref --short HEAD)

# Display branch and city in a box
box_text "$branch $city"

# Get the list of modified or added files
modified_files=$(git status --porcelain | awk '{if ($1 == "M" || $1 == "A") print $2}')

# Prepare the commit message
commit_message="Updated in '$city, $country' on BRANCH '$branch' BY '$(whoami)' ON '$(hostname)' for the files: "
for file in $modified_files; do
  commit_message+=" $file"
done

# Display commit message in a box
box_text "$commit_message"

# Commit and push the changes
git add .
git commit -m "$commit_message"
git push origin "$branch"

# Set post-commit Git configuration
git config user.name "$POST_COMMIT_GIT_USER_NAME"
git config user.email "$POST_COMMIT_GIT_USER_EMAIL"

# Set upstream branch
git branch --set-upstream-to=origin/test "$branch"

# Wait for a few seconds
sleep 3s
