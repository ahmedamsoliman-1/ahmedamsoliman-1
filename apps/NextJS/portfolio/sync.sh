#!/bin/bash

bucket_name='portfolio-aams'
website_directory='C:\workspace\S3\portfolio-v\dist'

region='me-central-1'
profile='s3'


aws s3 sync \
  --profile $profile \
  --region $region \
  --delete \
  $website_directory "s3://$bucket_name/" 


sleep 2s