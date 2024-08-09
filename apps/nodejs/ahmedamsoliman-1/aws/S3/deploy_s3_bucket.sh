#!/bin/bash

profile="s3-2"
# stack and buckket name:
name='ahmed-ali-m-soliman-pics-1'

# aws cloudformation validate-template \
#     --template-body file://s3_bucket.yml \
#     --profile $profile

# aws cloudformation deploy \
#     --stack-name $name \
#     --profile $profile \
#     --parameter-overrides S3BucketName=$name  \
#     --template-file s3_bucket.yml 

# upload files to bucket:
aws s3 sync \
    ../../public/temp_original/ s3://$name \
    --profile $profile


# echo "Done"

sleep 20s
