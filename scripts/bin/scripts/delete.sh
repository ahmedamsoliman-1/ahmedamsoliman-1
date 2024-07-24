#!/bin/bash

# Delete all deployments
kubectl delete deployments --all

# Delete all services
kubectl delete services --all

# Delete all pods
kubectl delete pods --all
