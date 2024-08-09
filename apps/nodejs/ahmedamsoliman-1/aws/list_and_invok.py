import boto3
import json

profile="aams-1-us-east-1"

session = boto3.Session(profile_name=profile)
lambda_client = session.client('lambda')

response = lambda_client.list_functions()

for function in response['Functions']:

    function_name = function['FunctionName']
    function_description = function['Description']
    
    function_url_configs = lambda_client.list_function_url_configs(FunctionName=function_name)
    

    if function_description == "Lambda function returns URLs from S3 Bucket":

        print(f"Function Name: {function_name}")

        function_url = function_url_configs['FunctionUrlConfigs'][0]['FunctionUrl']
    
        print(f"Function URL: {function_url}")

        # Invoke the Lambda function
        invoke_response = lambda_client.invoke(
            FunctionName=function_name,
            InvocationType='RequestResponse'
        )
        
        # Extract the response payload
        payload = invoke_response['Payload'].read().decode('utf-8')
        
        # Write the response JSON to a file
        filename = f"../public/data/{function_name}_response.json"
        with open(filename, 'w') as file:
            json.dump(json.loads(payload), file, indent=4)
        
        print(f"Invoked function: {function_name}")
        print(f"Response written to file: {filename}")
        print()
