#!/bin/bash

# Function to print colored messages
function colored_echo {
  local color="$1"
  local message="$2"
  local reset="\033[0m"

  case $color in
    "green")
      echo -e "\033[32m$message$reset"
      ;;
    "yellow")
      echo -e "\033[33m$message$reset"
      ;;
    "red")
      echo -e "\033[31m$message$reset"
      ;;
    "blue")
      echo -e "\033[34m$message$reset"
      ;;
    *)
      echo "$message"
      ;;
  esac
}

NAMESPACES=("default" "training-ui") 

CERT_FILE="/Users/ahmed.soliman/workspace/cs2/certs/avrioc.iobundle.crt"
SECRET_NAME="es-avrioc-iobundle-certificate"

# Loop through each namespace and create the secret
for NAMESPACE in "${NAMESPACES[@]}"; do
  # Check if the namespace exists
  if kubectl get namespace "$NAMESPACE" > /dev/null 2>&1; then
    colored_echo "green" "Namespace '$NAMESPACE' already exists."
  else
    # Create the namespace if it doesn't exist
    if kubectl create namespace "$NAMESPACE"; then
      colored_echo "blue" "Namespace '$NAMESPACE' created successfully."
    else
      colored_echo "red" "Failed to create namespace '$NAMESPACE'. Exiting."
      exit 1
    fi
  fi

  # Create the secret
  colored_echo "yellow" "Creating secret $SECRET_NAME in namespace $NAMESPACE..."
  kubectl create secret generic $SECRET_NAME \
    --namespace $NAMESPACE \
    --from-file=avrioc.iobundle.crt="$CERT_FILE" \
    --dry-run=client -o yaml | kubectl apply -f -
  
  if [ $? -eq 0 ]; then
    colored_echo "green" "Secret $SECRET_NAME created successfully in namespace $NAMESPACE."
    echo "---------------------------------------------------"
  else
    colored_echo "red" "Failed to create secret $SECRET_NAME in namespace $NAMESPACE."
  fi
done
