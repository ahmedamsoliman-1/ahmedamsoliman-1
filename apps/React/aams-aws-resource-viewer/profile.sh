#!/bin/bash

credentials_file="$HOME/.aws/credentials"
profiles=$(grep -oP '\[([^[\]]+)\]' "$credentials_file" | tr -d '[]')

for profile in $profiles; do
    echo "Running 'aws s3 ls' for profile: $profile"
    aws s3 ls --profile "$profile"
    echo "-----------------------------"
done

sleep 4s