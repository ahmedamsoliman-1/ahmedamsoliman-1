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
RELEASE_NAME=kibana

# # Load environment variables from secrets.env
# export $(grep -v '^#' secrets.env | xargs)

# # Replace placeholders in values.yaml
# sed -i '' "s/${USER_KEY}/$USER_KEY/g" values.yaml
# sed -i '' "s/${PASSWORD_KEY}/$PASSWORD_KEY/g" values.yaml


box_text "Create namespace $NAMESPACE if it doesn't exist" 36
kubectl get namespace $NAMESPACE &>/dev/null || kubectl create namespace $NAMESPACE


box_text "Install"
helm upgrade --install $RELEASE_NAME . -n $NAMESPACE -f values.yaml


# NOTES:
# 1. Watch all containers come up.
#   $ kubectl get pods --namespace=elk -l release=kibana -w
# 2. Retrieve the elastic user's password.
#   $ kubectl get secrets --namespace=elk elasticsearch-master-credentials -ojsonpath='{.data.password}' | base64 -d
# 3. Retrieve the kibana service account token.
#   $ kubectl get secrets --namespace=elk kibana-kibana-es-token -ojsonpath='{.data.token}' | base64 -d