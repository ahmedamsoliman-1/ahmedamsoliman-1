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


NAMESPACE=danswer
DANSWER_RELEASE=danswer

box_text "Create Namespace if it doesn't exist" 
kubectl get namespace $NAMESPACE &>/dev/null || kubectl create namespace $NAMESPACE



box_text "Linting" 
helm -n $NAMESPACE lint


# box_text "Install Dependecies"

# helm repo add bitnami https://charts.bitnami.com/bitnami
# helm repo add vespa https://unoplat.github.io/vespa-helm-charts
# helm repo add bitnamicharts oci://registry-1.docker.io/bitnamicharts
# helm repo update


box_text "Install overleaf release" 
helm -n $NAMESPACE upgrade --install $DANSWER_RELEASE .


box_text "Deployment/update done" 