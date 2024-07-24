#!/bin/bash


echo "----------------------------------------------------------------------------------"
echo "Deleting docker containers and images"
echo "----------------------------------------------------------------------------------"

if [ "$(docker ps -aq)" ]; then
    echo "Deleting containers"
    docker stop $(docker ps -aq)
    docker rm $(docker ps -aq)
    echo "Containers deleted"
fi
if [ "$(docker images -q)" ]; then
    echo "Deleting images"
    docker rmi $(docker images -q)
    echo "Images deleted"
fi




echo "----------------------------------------------------------------------------------"
echo "Pull images"
echo "----------------------------------------------------------------------------------"

docker pull node:20-alpine
docker pull node:latest
docker pull python:3.10.12



echo "----------------------------------------------------------------------------------"
echo "Build all docker images"
echo "----------------------------------------------------------------------------------"

echo "Building docker images"
echo "FrontEnd"
cd ../
docker build -t cs2_frontend_image .

echo "BackEnd"
cd ../cs2-platform-backend
docker build -t cs2_backend_image .

echo "Engine"
cd ../cs2-platform-engine
docker build -t cs2_engine_image .

echo "TraininUI"
cd ../training_ui
docker build -t cs2_traininui_image .

cd ../cs2-platform/kubernetes





echo "----------------------------------------------------------------------------------"
echo "Delete previous minikube and start new one"
echo "----------------------------------------------------------------------------------"

minikube delete
minikube start
minikube status










echo "----------------------------------------------------------------------------------"
echo "Load images to minikube"
echo "----------------------------------------------------------------------------------"

minikube image load cs2_frontend_image
minikube image load cs2_backend_image
minikube image load cs2_engine_image
minikube image load cs2_traininui_image
ls








echo "----------------------------------------------------------------------------------"
echo "Apply kubernetes deployment"
echo "----------------------------------------------------------------------------------"
kubectl apply -f cs2-fe-be-deployment.yml
kubectl apply -f cs2-ai-engine.yml
kubectl apply -f cs2-training-ui.yml
kubectl get deployments








echo "----------------------------------------------------------------------------------"
echo "Dashboard"
echo "----------------------------------------------------------------------------------"
minikube service --all
minikube dashboard --url



# # # # minikube mount /home/ahmed.soliman@Avrcorp.net/cs2/cs2-platform-engine/model:/data/model
# # # # minikube dashboard --url