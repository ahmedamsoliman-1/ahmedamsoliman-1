#!/bin/bash


box_text() {
  local text="$1"
  local color="${2:-32}" # Default to green if no color is specified
  local padding=40

  # Calculate text length and total width of the box
  local text_length=${#text}
  local box_width=$((text_length + padding * 2))

  # Top border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"

  # Text with padding
  echo -e "\033[${color}m$(printf '%*s' "$padding" '')$text$(printf '%*s' "$padding" '')\033[0m"

  # Bottom border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"
}




git config user.name "Ahmed Ali Mohamed Soliman"
git config user.email "ahmed-3010@hotmail.com"

city=$(curl -s ipinfo.io/city)
country=$(curl -s ipinfo.io/country)

box_text $country

# Get the name of the current branch
branch=$(git symbolic-ref --short HEAD)

box_text $branch $city
# Get the list of modified or added files
modified_files=$(git status --porcelain | awk '{if ($1 == "M" || $1 == "A") print $2}')

# Commit message mentioning the updated or added files and the branch
commit_message="Updated in '$city, $country' on BRANCH '$branch' BY '$(whoami)' ON '$(hostname)' for the files: "
for file in $modified_files; do
  commit_message+=" $file"
done

box_text $commit_message
# Commit and push the changes
git add .
git commit -m "$commit_message"
git push origin $branch

git config user.name "Ahmed Soliman"
git config user.email "ahmed.soliman@avrioc.com"

git branch --set-upstream-to=origin/test "$branch"

sleep 3s