# AWS Configuration for ahmedalimsoliman.click

## S3 Bucket

- AWS S3 Bucket is created using the script 'deploy_s3_bucjet.sh' which will deploy the cloud formation template 's3_bucket.yml'
- This S3 bucket will host the compressed lambda function for:
  - Videos URL
  - Fellas URL
  - My Years URLs
  - Certs URLs
  - OAU URLs

## Zipper.py script

- Used to compressed the lambda function handler to a zip file
  - lambda_handler.py -> lambda_handler.zip

## Sub directories

- Each directory represent a lambda function with customized configuration, cuntains:
  - delply_lambda.sh: Script to deploy the lambda function using cloudformation template
  - lambda.yml: The cloud formation template.
  - lambda_handler.py: The lambda function implementation
