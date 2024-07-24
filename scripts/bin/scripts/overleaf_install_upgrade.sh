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


NAMESPACE=overleaf

OVERLEAF_RELEASE=overleaf-release
MONGO_RELEASE=overleaf-release-mongodb
REDIS_RELEASE=overleaf-release-redis
REDIS_COMMANDER=overleaf-release-redis-commander
MONGO_EXPRESS=overleaf-release-mongo-express

MONGO_REGISTRY=oci://registry-1.docker.io/bitnamicharts/mongodb
REDIS_REGISTRY=oci://registry-1.docker.io/bitnamicharts/redis
REDIS_COMMANDER_REGISTRY=https://kfirfer.github.io/charts/
MONG_EXPRESS_REGISTY=https://cowboysysop.github.io/charts/

REDIS_COMMANDER_VERSION='0.1.15'


REDIS_COMMANDER_VAUES_FILE=values-redis-commander.yaml
REDIS_VAUES_FILE=values-redis.yaml
MONGO_VAUES_FILE=values-mongo.yaml
MONG_EXPRESS_VALUES_FILE=values-mongo-express.yaml

box_text "Create Namespace if it doesn't exist" 
kubectl get namespace $NAMESPACE &>/dev/null || kubectl create namespace $NAMESPACE



box_text "Linting" 
helm -n $NAMESPACE lint


box_text "Install overleaf release" 
helm -n $NAMESPACE upgrade --install $OVERLEAF_RELEASE .


box_text "Install Redis Commander" 
helm -n $NAMESPACE repo add kfirfer $REDIS_COMMANDER_REGISTRY
helm -n $NAMESPACE upgrade --install $REDIS_COMMANDER -f $REDIS_COMMANDER_VAUES_FILE kfirfer/redis-commander --version $REDIS_COMMANDER_VERSION

box_text "Install Redis release" 
helm -n $NAMESPACE upgrade --install $REDIS_RELEASE -f $REDIS_VAUES_FILE $REDIS_REGISTRY

box_text "Install Mongo release" 
helm -n $NAMESPACE upgrade --install $MONGO_RELEASE -f $MONGO_VAUES_FILE $MONGO_REGISTRY




box_text "Install Mongo Express"
helm -n $NAMESPACE repo add cowboysysop $MONG_EXPRESS_REGISTY
helm -n $NAMESPACE upgrade --install $MONGO_EXPRESS -f $MONG_EXPRESS_VALUES_FILE cowboysysop/mongo-express


box_text "List all releases" 
helm -n $NAMESPACE list
helm -n $NAMESPACE lint

box_text "Restart kubectl manuall port forwarding"
systemctl --user restart kub_pf.service


box_text "Deployment/update done" 