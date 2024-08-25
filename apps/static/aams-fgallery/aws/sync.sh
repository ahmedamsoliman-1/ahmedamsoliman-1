#!/bin/bash


bucket_names=(
  "fluid.ahmedalimsoliman.click"
  "f.ahmedalimsoliman.click"
)

website_directory='C:\workspace\s3\fluid-gallery'

region='me-central-1'
profile='route53'


for bucket in "${bucket_names[@]}"; do
  # aws s3 sync \
  #   --profile $profile \
  #   --region $region \
  #   --delete \
  #   $website_directory "s3://$bucket/" 

  echo "http://$bucket.s3-website.$region.amazonaws.com/" > s3-endpoints/$bucket.log
done


# ./update_git.sh

sleep 2s