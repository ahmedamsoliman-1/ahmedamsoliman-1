#!/bin/bash


# 037588651218.dkr.ecr.me-central-1.amazonaws.com/ai-chess/cs2-training-ui
# 037588651218.dkr.ecr.me-central-1.amazonaws.com/ai-chess/cs2-platform-datapipeline

PROFILE_NAME=chess-dev
AWS_REGION=me-central-1
AWS_ACCOUNT_ID=037588651218

REPOSITORY_NAME=ai-chess/cs2-training-ui
REPOSITORY_NAME=ai/avrioc-cloud

TAG=latest



# Login
aws ecr get-login-password --profile $PROFILE_NAME --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# # Pull
# docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:$TAG .


# Push
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:$TAG




# # build
# docker build -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY_NAME:$TAG .