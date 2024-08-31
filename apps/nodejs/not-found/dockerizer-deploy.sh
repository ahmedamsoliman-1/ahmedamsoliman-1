#!/bin/bash


# Function to display text in a colored box
function box_text {
  local message=$1
  local color=${2:-32}  # Default color is green (32)
  echo -e "\033[${color}m${message}\033[0m"
}


# REGISTRY=10.10.25.207:5000
IMAGE_NAME=not-found
NAMESPACE=not-found

TAG_1="1"
TAG_2="1"
TAG_3="9"
DOCKER_TAG="$TAG_1.$TAG_2.$TAG_3"


PLATFORM_AMD=linux/amd64
PLATFORM_ARM=linux/arm64


box_text "Build and push images to Docker Hub"

docker build -t $REGISTRY/$IMAGE_NAME:$DOCKER_TAG .
docker push $REGISTRY/$IMAGE_NAME:$DOCKER_TAG



box_text "Check image architecture"
docker inspect ahmedalimsolimansd/not-found:1.1.6 | grep Architecture


box_text "Write docker image to .env"
echo -e "#\n" >> .env
echo "IMAGE_NAME=$REGISTRY/$IMAGE_NAME:$DOCKER_TAG" >> .env



box_text "Create nsamespace if not exsist"
kubectl create namespace -n $NAMESPACE || true
kubectl config set-context --current --namespace=$NAMESPACE



box_text "Deploy image to cluster"
kubectl apply -f deployment.yaml




box_text "Check"
kubectl -n $NAMESPACE get pods
kubectl -n $NAMESPACE get svc
kubectl -n $NAMESPACE get ingress