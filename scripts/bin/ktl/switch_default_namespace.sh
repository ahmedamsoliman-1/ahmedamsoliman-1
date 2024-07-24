#!/bin/bash

# bin/main_script.sh


# Source the helper functions and configuration
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"


command1="kubectl get nodes"
command2="kubectl config get-contexts"

box_text "$command1"
$command1

box_text "$command2"
$command2



if [ -z "$1" ]; then
  echo "Usage: $0 <namespace>"
  exit 1
fi

NAMESPACE=$1

box_text "Setting default namespace to '$NAMESPACE'..."
# Set the default namespace for the current context
kubectl config set-context --current --namespace="$NAMESPACE"

# Check if the command was successful
if [ $? -eq 0 ]; then
  echo "Default namespace set to '$NAMESPACE'"
else
  echo "Failed to set default namespace"
fi

box_text "Verifying the default namespace..."
# Verify the default namespace
CURRENT_NAMESPACE=$(kubectl config view --minify --output=jsonpath='{.contexts[0].context.namespace}')
if [ "$CURRENT_NAMESPACE" == "$NAMESPACE" ]; then
  echo "Default namespace is set correctly to '$NAMESPACE'"
  box_text "kubectl get pods"
  kubectl get pods
fi