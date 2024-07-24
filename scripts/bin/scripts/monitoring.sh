#!/bin/bash

box_text() {
  local text="$1"
  local color="${2:-32}" 
  local padding=40

  local text_length=${#text}
  local box_width=$((text_length + padding * 2))

  # Top border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"

  # Text with padding
  echo -e "\033[${color}m$(printf '%*s' "$padding" '')$text$(printf '%*s' "$padding" '')\033[0m"

  # Bottom border
  echo -e "\033[${color}m$(printf '%*s' "$box_width" '' | tr ' ' '*')\033[0m"
}







NAMESPACE=monitoring

box_text "Create Namespace if it doesn't exists" 
if kubectl get namespace $NAMESPACE &>/dev/null; then
  echo "Namespace '$NAMESPACE' already exists. Skipping creation."
else
  echo "Namespace '$NAMESPACE' does not exist. Creating namespace."
  kubectl create namespace $NAMESPACE
  echo "Namespace '$NAMESPACE' created."
fi




box_text "Get Monitoring manifests if not exists"
if [ ! -d "manifests" ]; then
  echo "The 'manifests' directory does not exist. Cloning repository and copying manifests."
  sudo rm -r /tmp/manifests-repo
  git clone --depth 1 https://github.com/prometheus-operator/kube-prometheus.git -b release-0.10 /tmp/manifests-repo
  cp -R /tmp/manifests-repo/manifests .
else
  echo "The 'manifests' directory already exists. Skipping clone and copy."
fi




box_text "Deploying stuff"

# # kubectl create -f manifests/setup/
# # kubectl create -f manifests/

# kubectl apply -f manifests/setup/
# kubectl apply -f manifests/

kubectl apply --server-side -f manifests/setup
kubectl wait \
	--for condition=Established \
	--all CustomResourceDefinition \
	--namespace=monitoring
kubectl apply -f manifests/



box_text "Done"


# admin ::: avr_GRFANA_der9341as!@