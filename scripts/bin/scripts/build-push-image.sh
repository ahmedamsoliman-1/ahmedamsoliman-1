#!/bin/bash


USERNAME=10.10.25.207:5000
IMAGE_NAME=load-balancer-nodejs
VERSION=0.0.1




sudo docker build -t $IMAGE_NAME .
sudo docker tag $IMAGE_NAME:latest $USERNAME/$IMAGE_NAME:$VERSION
sudo docker push $USERNAME/$IMAGE_NAME:$VERSION