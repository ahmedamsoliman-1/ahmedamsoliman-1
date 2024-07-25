#!/bin/bash

bucket_name='aams-sd-web-resume'
website_directory='C:\workspace\s3\web-resume'

region='me-central-1'
profile='s3'


aws s3 sync \
  --profile $profile \
  --region $region \
  $website_directory "s3://$bucket_name/" 