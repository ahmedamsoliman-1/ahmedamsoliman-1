#!/bin/bash

# Set variables
BUCKET_NAME="ahmedalimohsoliman.com"
DOMAIN_NAME="ahmedalimohsoliman.com"
WEBSITE_DIRECTORY="."
PROJECT_ID="aams-420614"


# # Set variables
# BUCKET_NAME="ahmedalimsoliman.com"
# DOMAIN_NAME="ahmedalimsoliman.com"
# WEBSITE_DIRECTORY="."
# PROJECT_ID="big-star-420419"


# Create a new Cloud Storage bucket for website hosting
gsutil mb -p $PROJECT_ID -c standard -l us-central1 gs://$BUCKET_NAME

# Upload website assets to Cloud Storage bucket, excluding .git directory
gsutil -m rsync -x ".*/*" -r $WEBSITE_DIRECTORY gs://$BUCKET_NAME

# Set permissions to make bucket content publicly accessible
gsutil -m acl ch -r -u AllUsers:R gs://$BUCKET_NAME

# Configure website hosting for the bucket
gsutil web set -m index.html -e 404.html gs://$BUCKET_NAME

# Print website endpoint URL
echo "Website URL: https://$BUCKET_NAME.storage.googleapis.com"

# Verify DNS propagation
echo "Verify DNS propagation for $DOMAIN_NAME"
# You can use DNS lookup tools or APIs to automate this verification process
