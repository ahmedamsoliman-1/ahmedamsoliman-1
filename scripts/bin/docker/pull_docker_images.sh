#!/bin/bash

DOCKERHUB_ID=ahmedalimsolimansd
DOCKER_TAG=1.1.6

IMAGES=(
  "portfolio"
  "resume-dev-web"
  "react-app-simple"
  "frontend-svc"
  "order-svc"
  "user-svc"
  "ahmedamsoliman-1"
  "flask-1"
  "aams-cvviewer-resume-dev"
  "aams-cvviewer-resume-dataeng"
  "aams-cvviewer-resume-devops"
  "aams-cvviewer-resume-ts"
  "go-linktree-1"
  "aams-links"
  "auth-service"
  "nodejs-ejs-auth"
  "blog_app"
  "aams-fgallery"
  "aams-rgb-color-game"
  "aams-aws-resource-viewer"
  "aams-linktree-react"
)

function box_text {
  local message=$1
  local color=${2:-32}
  echo -e "\033[${color}m${message}\033[0m"
}

box_text "Pulling Docker images..."

successful_pulls=0
failed_pulls=0

for image in "${IMAGES[@]}"; do
  image_name="$DOCKERHUB_ID/$image:$DOCKER_TAG"
  echo "$image_name ..."
  
  # Pull the image
  if output=$(docker pull $image_name 2>&1); then
    ((successful_pulls++))
    # Extract digest ID
    digest=$(echo "$output" | grep "Digest:" | awk '{print $2}')
    echo "Successfully pulled $image_name with digest $digest"
  else
    ((failed_pulls++))
    echo "Failed to pull $image_name"
  fi
done

box_text "Total of ${#IMAGES[@]} docker images processed." 32
box_text "$successful_pulls images pulled successfully." 32
box_text "$failed_pulls images failed to pull." 31
