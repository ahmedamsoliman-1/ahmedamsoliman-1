#!/bin/bash

# Remove all *.zip files

rm */*.zip

# Redploy lambda functions templates

cd certs_urls 
./deploy_lambda.sh

cd ../fellas_urls
./deploy_lambda.sh

cd oau_urls 
./deploy_lambda.sh

cd ../videos_urls
./deploy_lambda.sh

cd years_urls 
./deploy_lambda.sh


echo "Done"

sleep 2
