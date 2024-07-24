#!/bin/bash


# Get the name of the current branch
branch=$(git symbolic-ref --short HEAD)

# Get the list of modified or added files
modified_files=$(git status --porcelain | awk '{if ($1 == "M" || $1 == "A") print $2}')

# Commit message mentioning the updated or added files and the branch
commit_message="Updated on branch '$branch' by '$(whoami)' on '$(hostname)' for the files: "
for file in $modified_files; do
  commit_message+=" $file"
done

# Commit and push the changes
git add .
git commit -m "$commit_message"
git push origin $branch

npm run deploy

sleep 4s