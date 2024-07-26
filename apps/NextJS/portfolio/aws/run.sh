#!/bin/bash

profile="route53"
us_profile="route53-us-east-1"
region="me-central-1"
cert_stack="vite-ahmedalimsoliman-click-cert-1"
main_stack="vite-ahmedalimsoliman-click-dist-1"
DNS="vite.ahmedalimsoliman.click"
directory="C:\workspace\s3\portfolio-v\dist"

aws cloudformation validate-template \
    --template-body file://certificate.yml \
    --profile $us_profile

aws cloudformation deploy \
    --stack-name $cert_stack \
    --profile $us_profile \
    --parameter-overrides ACMCertificateName=$DNS  \
    --template-file certificate.yml 

echo "Certificate for $DNS created"

cert_arn=$(aws acm list-certificates --profile="$us_profile" --query "CertificateSummaryList[?DomainName=='$DNS'].CertificateArn" --output text)

echo "Creating the main stack"

echo $cert_arn

aws cloudformation validate-template \
    --template-body file://distripution.yml \
    --profile $profile

aws cloudformation deploy \
    --stack-name $main_stack \
    --parameter-overrides MyCertificateARN=$cert_arn \
    --profile $profile \
    --template-file distripution.yml 

echo "Main template created"


echo "Configuring the bucket"

echo "Enable public access to the bucket"
aws s3api put-public-access-block \
    --profile $profile \
    --region $region \
    --bucket $DNS \
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo "Update the bucket policy for public read access"
aws s3api put-bucket-policy \
    --profile $profile \
    --region $region \
    --bucket $DNS \
  --policy "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [
      {
          \"Sid\": \"PublicReadGetObject\",
          \"Effect\": \"Allow\",
          \"Principal\": \"*\",
          \"Action\": \"s3:GetObject\",
          \"Resource\": \"arn:aws:s3:::$DNS/*\"
      }
  ]
}"

echo "Enable versioning"
aws s3api put-bucket-versioning \
    --profile $profile \
    --region $region \
    --bucket $DNS \
    --versioning-configuration Status=Enabled


echo "Enable the s3 bucket to host an `index` and `error` html page"
aws s3 website "s3://$DNS" \
    --profile $profile \
    --region $region \
    --index-document index.html \
    --error-document index.html

aws s3 cp --metadata \
    ContentType="application/javascript" s3://$DNS/assets/index-f6232116.js s3://$DNS/assets/index-f6232116.js
    
echo "Put content"
aws s3 sync \
    --profile $profile \
    --region $region \
    --delete \
    $directory "s3://$DNS/"

echo "Done"

sleep 20s
