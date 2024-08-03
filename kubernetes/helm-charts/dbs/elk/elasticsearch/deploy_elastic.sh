#!/bin/bash

box_text() {
  local text="$1"
  local color="${2:-32}" # Default to green if no color is specified
  local padding=40

  # Calculate text length and total width of the box
  local text_length=${#text}
  local box_width=$((text_length + padding * 2))

  # Top border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"

  # Text with padding
  echo -e "\033[${color}m$(printf '%*s' "$padding" '')$text$(printf '%*s' "$padding" '')\033[0m"

  # Bottom border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"
}



NAMESPACE=elk
RELEASE_NAME=elasticsearch

# # Load environment variables from secrets.env
# export $(grep -v '^#' secrets.env | xargs)

# # Replace placeholders in values.yaml
# sed -i '' "s/${USER_KEY}/$USER_KEY/g" values.yaml
# sed -i '' "s/${PASSWORD_KEY}/$PASSWORD_KEY/g" values.yaml


box_text "Create namespace $NAMESPACE if it doesn't exist" 36
kubectl get namespace $NAMESPACE &>/dev/null || kubectl create namespace $NAMESPACE

box_text "Retrive secrets from HV"
GG=$(hcp vault-secrets secrets open GG --format=json | jq -r '.static_version.value')
# export GG=$GG
echo "GG=$GG"


box_text "Install"
# helm upgrade --install $RELEASE_NAME . -n $NAMESPACE -f values.yaml --set GG=$GG
helm upgrade --install $RELEASE_NAME . -n $NAMESPACE -f values.yaml --set secret.password=$GG



# Release "elasticsearch" has been upgraded. Happy Helming!
# NAME: elasticsearch
# LAST DEPLOYED: Fri Aug  2 23:29:32 2024
# NAMESPACE: elk
# STATUS: deployed
# REVISION: 2
# NOTES:
# 1. Watch all cluster members come up.
#   $ kubectl get pods --namespace=elk -l app=elasticsearch-master -w
# 2. Retrieve elastic user's password.
#   $ kubectl get secrets --namespace=elk elasticsearch-master-credentials -ojsonpath='{.data.password}' | base64 -d
# 3. Test cluster health using Helm test.
#   $ helm --namespace=elk test elasticsearch
# ahmed.soliman@AVRAST3412 elasticsearch %   


# kubectl get secret elasticsearch-client-certs -n elk -o jsonpath='{.data.ca\.crt}' | base64 --decode > ca.crt
# kubectl get secret elasticsearch-client-certs -n elk -o jsonpath='{.data.client\.crt}' | base64 --decode > client.crt
# kubectl get secret elasticsearch-client-certs -n elk -o jsonpath='{.data.client\.key}' | base64 --decode > client.key
