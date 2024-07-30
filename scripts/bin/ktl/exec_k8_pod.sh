#!/bin/bash

# Usage: ./exec_to_first_pod.sh [<namespace>]

# Source the helper functions and configuration
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"

command1="kubectl get nodes"
command2="kubectl config get-contexts"

box_text "$command1"
$command1

box_text "$command2"
$command2

# Check if a namespace is provided
if [ -z "$1" ]; then
  # No namespace provided, get the current default namespace
  NAMESPACE=$(kubectl config view --minify --output 'jsonpath={..namespace}')
  if [ -z "$NAMESPACE" ]; then
    echo "No namespace provided and no default namespace set"
    exit 1
  fi
else
  NAMESPACE=$1
fi

box_text "Namespace"
echo "Using namespace: $NAMESPACE"

box_text "Pods"
kubectl get pods -n $NAMESPACE

# Get the prefix (first three letters) of the namespace
PREFIX=$(echo $NAMESPACE | cut -c 1-3)

# Get the first pod name that matches the prefix in the specified or default namespace
FIRST_POD=$(kubectl get pods -n "$NAMESPACE" -o json | jq -r --arg PREFIX "$PREFIX" '.items[] | select(.metadata.name | startswith($PREFIX)) | .metadata.name' | head -n 1)

# Check if a pod was found
if [ -z "$FIRST_POD" ]; then
  echo "No pods found in namespace '$NAMESPACE' that match the prefix '$PREFIX'"
  exit 1
fi

box_text "First Pod"
echo "First pod in namespace '$NAMESPACE' that matches the prefix '$PREFIX' is '$FIRST_POD'"

# Execute an interactive shell in the first pod
kubectl exec -it -n "$NAMESPACE" "$FIRST_POD" -- bash
