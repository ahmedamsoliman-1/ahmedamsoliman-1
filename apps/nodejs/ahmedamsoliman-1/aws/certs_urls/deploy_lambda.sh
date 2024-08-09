#!/bin/bash

# Variables
stack='aams-lambda-to-list-urls-certs-1'
key="certs_urls"

# Const
profile="aams-1-us-east-1"
bucket='aams-urls-s3-bucket-zipped-files-1'
template='lambda.yml'
key2="lambda_handler.zip"
source="lambda_handler.py"
destination="lambda_handler.zip"


# perform zipping ...
py ../zipper.py $source $destination

# upload ziiped file to s3 bucket
aws s3 cp \
    --profile $profile \
    $destination "s3://$bucket/$key/$destination"


aws cloudformation validate-template \
    --template-body file://$template \
    --profile $profile

aws cloudformation deploy \
    --stack-name $stack \
    --capabilities CAPABILITY_IAM \
    --profile $profile \
    --parameter-overrides S3KeyName=$key/$key2 \
    --template-file $template

aws cloudformation wait \
    stack-create-complete \
    --profile $profile \
    --stack-name $stack



# Remove zipped file
rm $destination


# update the stack

# aws cloudformation update-stack \
#     --stack-name $stack  \
#     --capabilities CAPABILITY_IAM \
#     --profile $profile \
#     --template-body file://$template

# aws cloudformation wait \
#     stack-update-complete \
#     --profile $profile \
#     --stack-name $stack






# aws cloudformation describe-stacks \
#     --profile $profile \
#     --stack-name $stack \
#     --query "Stacks[0].Outputs[?OutputKey=='LambdaFunctionName'].OutputValue" \
#     --output text



# FUNCTION_NAME=$(aws cloudformation describe-stacks \
#   --profile $profile \
#   --stack-name $stack \
#   --query "Stacks[0].Outputs[?OutputKey=='LambdaFunctionName'].OutputValue" \
#   --output text)


# aws lambda invoke \
#   --function-name $FUNCTION_NAME \
#   --profile $profile \
#   $(tty) > /dev/null

sleep 2s