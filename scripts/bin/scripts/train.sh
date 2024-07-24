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




# echo "----------------------------------------------------------------------------------"
# echo "Pull images"
# echo "----------------------------------------------------------------------------------"

# docker pull node:latest



echo "----------------------------------------------------------------------------------"
echo "Build all docker images"
echo "----------------------------------------------------------------------------------"

echo "TraininUI"
docker build -t cs2_traininui_image /Users/ahmed.soliman/workspace/cs2/training_ui/





# echo "----------------------------------------------------------------------------------"
# echo "Delete previous minikube and start new one"
# echo "----------------------------------------------------------------------------------"

# minikube delete
# minikube start
# minikube status






# echo "----------------------------------------------------------------------------------"
# echo "Load images to minikube"
# echo "----------------------------------------------------------------------------------"

# minikube image load cs2_traininui_image
# ls









# echo "----------------------------------------------------------------------------------"
# echo "Apply kubernetes deployment"
# echo "----------------------------------------------------------------------------------"
# kubectl apply -f cs2-training-ui.yml
# kubectl get deployments








# echo "----------------------------------------------------------------------------------"
# echo "Dashboard"
# echo "----------------------------------------------------------------------------------"
# minikube service --all
# minikube dashboard --url

