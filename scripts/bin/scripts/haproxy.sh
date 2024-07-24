#!/bin/bash



kubectl apply -f deployment.yaml

kubectl -n haproxy get all