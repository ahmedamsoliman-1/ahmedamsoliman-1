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



NAMESPACE=argocd



box_text "Apply argo cd application"
kubectl apply -n $NAMESPACE -f argo-applications/example.yaml
kubectl apply -n $NAMESPACE -f argo-applications/argocd.yaml
kubectl apply -n $NAMESPACE -f argo-applications/frontend.yaml
# kubectl apply -n $NAMESPACE -f argo-applications/app3.yaml
# kubectl apply -n $NAMESPACE -f argo-applications/app4.yaml
# kubectl apply -n $NAMESPACE -f argo-applications/app5-helms.yaml

box_text "Get application"
kubectl -n $NAMESPACE get application -o wide