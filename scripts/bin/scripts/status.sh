#!/bin/bash

# Specify the path where you want to run 'git status'
base_path="/home/ahmed.soliman@Avrcorp.net/cs2"

# Loop through all directories in the specified path
for dir in "$base_path"/*/; do
    if [ -d "$dir/.git" ]; then
        # If it's a Git repository, run 'git status'
        echo "Checking status in $dir"
        (cd "$dir" && git status)
        echo "------------------------------------"
    fi
done
