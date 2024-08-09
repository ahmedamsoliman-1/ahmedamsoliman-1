#!/bin/bash

# Specify the AWS profile
profile="r53-us-east-1"

# Get the list of Lambda function names
# aws lambda list-functions --query 'Functions[].FunctionName' --output text --profile r53-us-east-1
function_names=$(aws lambda list-functions --query 'Functions[].FunctionName' --output text --profile "$profile")

# Specify the output file path
output_file="urls.txt"

# Iterate over each function and retrieve the invoke URL
for function_name in $function_names; do
    invoke_url=$(aws lambda get-function-url-config --function-name "$function_name" --query 'FunctionUrl' --output text --profile "$profile")
    # aws lambda get-function-url-config --function-name list-urls-iam-thumb-lambda-function-LambdaFunction-wsvEWYnClCr8 --query 'FunctionUrl' --output text --profile r53-us-east-1
    if [[ -z $invoke_url ]]; then
        invoke_url="N/A"
    fi
    echo "Function Name: $function_name"
    echo "Invoke URL: $invoke_url"
    echo ""
    # Append the output to the file
    echo "Function Name: $function_name" >> "$output_file"
    echo "Invoke URL: $invoke_url" >> "$output_file"
    echo "" >> "$output_file"
done

echo "Output written to $output_file"
