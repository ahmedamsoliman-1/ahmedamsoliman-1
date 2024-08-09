#!/bin/bash

# Variables
var='certs-original'

# Const
stack='ahmedalimsoliman-click-aams-5'
profile='aams-5'
template='ahmedalimsoliman.click.yml'
imageID='ami-022e1a32d3f742bd8'
key_pair='aams-5'
isntance_type='t2.micro'

aws cloudformation validate-template \
    --template-body file://$template \
    --profile $profile

aws cloudformation deploy \
    --stack-name $stack \
    --capabilities CAPABILITY_IAM \
    --profile $profile \
    --parameter-overrides ImageIdName=$imageID \
      KeyNameName=$key_pair \
      InstanceTypeName=$isntance_type \
    --template-file $template


sleep 6s