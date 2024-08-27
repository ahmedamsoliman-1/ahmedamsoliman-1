#!/bin/bash

box_text() {
  local text="$1"
  local color="${2:-32}" # Default to green if no color is specified
  local padding=40

  # Calculate text length and total width of the box
  local text_length=${#text}
  local box_width=$((text_length + padding * 2))

  # Top bfrontend
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"

  # Text with padding
  echo -e "\033[${color}m$(printf '%*s' "$padding" '')$text$(printf '%*s' "$padding" '')\033[0m"

  # Bottom bfrontend
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"
}


NAMESPACE=auth-svc
box_text "Create namespace $NAMESPACE if it doesn't exist" 36
kubectl get namespace $NAMESPACE &>/dev/null || kubectl create namespace $NAMESPACE

box_text "Linting"
helm lint

box_text "Install Helm chart: $NAMESPACE"
helm upgrade --install $NAMESPACE-release . -f values-auth.yaml -n $NAMESPACE

NAMESPACE=auth-test-svc
box_text "Create namespace $NAMESPACE if it doesn't exist" 36
kubectl get namespace $NAMESPACE &>/dev/null || kubectl create namespace $NAMESPACE

box_text "Linting"
helm lint

box_text "Install Helm chart: $NAMESPACE"
helm upgrade --install $NAMESPACE-release . -f values-test-svc.yaml -n $NAMESPACE