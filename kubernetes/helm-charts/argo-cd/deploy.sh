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



NAMESPACE=argo-cd



box_text "Create namespace $NAMESPACE if it doesn't exist" 36
kubectl get namespace $NAMESPACE &>/dev/null || kubectl create namespace $NAMESPACE


box_text "Install"
helm upgrade --install $NAMESPACE-release . -n $NAMESPACE -f values.yaml

box_text "Admin password" 36
kubectl -n $NAMESPACE get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode


#!/bin/bash

# box_text() {
#   local text="$1"
#   local color="${2:-32}" # Default to green if no color is specified
#   local padding=40

#   # Calculate text length and total width of the box
#   local text_length=${#text}
#   local box_width=$((text_length + padding * 2))

#   # Top border
#   echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"

#   # Text with padding
#   echo -e "\033[${color}m$(printf '%*s' "$padding" '')$text$(printf '%*s' "$padding" '')\033[0m"

#   # Bottom border
#   echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"
# }

# NAMESPACE=argo-cd

# box_text "Create namespace $NAMESPACE if it doesn't exist" 36
# kubectl get namespace $NAMESPACE &>/dev/null || kubectl create namespace $NAMESPACE

# # # Custom values
# # CUSTOM_VALUES="\
# # password=${HELM_SECRET_PASSWORD},\
# # anotherKey=${HELM_OTHER_SECRET}"

# box_text "Install/Upgrade Helm chart" 32

# helm upgrade --install $NAMESPACE-release . -n $NAMESPACE -f values.yaml

# box_text "Get Helm release details" 34
# helm status $NAMESPACE-release -n $NAMESPACE
