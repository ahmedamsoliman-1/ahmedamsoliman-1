#!/bin/bash

# Variables
var='videos-thumb'

# Const
stack='list-urls-'$var'-lambda-function'
# Const
profile="r53-us-east-1"
bucket='us.zipped.ahmedalimsoliman.click'
template='lambda.yml'


source=$stack.py
destination=$stack.zip
handler=$stack.lambda_handler


# perform zipping ...
py ../zipper.py $source $destination

# upload ziiped file to s3 bucket
aws s3 cp \
    --profile $profile \
    $destination "s3://$bucket/$destination"


aws cloudformation validate-template \
    --template-body file://$template \
    --profile $profile

aws cloudformation deploy \
    --stack-name $stack \
    --capabilities CAPABILITY_IAM \
    --profile $profile \
    --parameter-overrides \
      S3KeyName=$destination \
      LambdaHandler=$handler \
      S3BucketName=$bucket \
      LAmbdaFunctionDescription=$var \
    --template-file $template

# aws cloudformation wait \
#     stack-create-complete \
#     --profile $profile \
#     --stack-name $stack

# Remove zipped file
rm $destination


sleep 6s