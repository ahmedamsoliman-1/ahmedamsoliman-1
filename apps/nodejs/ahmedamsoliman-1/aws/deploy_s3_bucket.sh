#!/bin/bash

profile="aams-1-us-east-1"
stack='aams-urls-s3-bucket-zipped-files-1'

aws cloudformation validate-template \
    --template-body file://s3_bucket.yml \
    --profile $profile

aws cloudformation deploy \
    --stack-name $stack \
    --profile $profile \
    --parameter-overrides S3BucketName=$stack  \
    --template-file s3_bucket.yml 



# echo "Done"

sleep 20s
