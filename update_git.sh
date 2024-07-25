#!/bin/bash

git config user.name "Ahmed Ali Mohamed Soliman"
git config user.email "ahmed-3010@hotmail.com"

city=$(curl -s ipinfo.io/city)
country=$(curl -s ipinfo.io/country)

# Get the name of the current branch
branch=$(git symbolic-ref --short HEAD)

# Get the list of modified or added files
modified_files=$(git status --porcelain | awk '{if ($1 == "M" || $1 == "A") print $2}')

# Base commit message
commit_message="Updated in '$city, $country' on BRANCH '$branch' BY '$(whoami)' ON '$(hostname)' for the files: "
for file in $modified_files; do
  commit_message+=" $file"
done

# Check if a commit message parameter is provided
if [ "$#" -gt 0 ]; then
  user_commit_message="$1"
  commit_message="Custom message: '$user_commit_message'. $commit_message"
fi

# Commit and push the changes
git add .
git commit -m "$commit_message"
git push origin $branch

git config user.name "Ahmed Soliman"
git config user.email "ahmed.soliman@avrioc.com"

git branch --set-upstream-to=origin/$branch "$branch"

sleep 3s
