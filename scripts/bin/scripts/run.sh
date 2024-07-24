#!/bin/bash


# LOAD

# minikube image load frontend
# minikube image load backend
# minikube image load engine


# Apply the deployment YAML to create the deployment
kubectl apply -f deployment.yml

kubectl get deployments


# Apply the service YAML to create the service
kubectl apply -f service.yml

kubectl get services

# kubectl get pods --all

# kubectl logs app-deployment-df4ccd6d9-srw6g frontend
# kubectl logs app-deployment-df4ccd6d9-srw6g backend
