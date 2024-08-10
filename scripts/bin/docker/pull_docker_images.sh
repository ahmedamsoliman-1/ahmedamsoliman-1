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


DOCKERHUB_ID=ahmedalimsolimansd
DOCKER_TAG=1.0.1

IMAGES=(
  "aams-portfolio"
  "aams-node-templates"
  "aams-personal-cloud"
  "aams-resume-data-eng-pdf"
  "aams-user-svc"
  "aams-frontend-svc"
  "aams-order-svc"
  "aams-resume-dev-web"
  "aams-ahmedamsoliman-1"
  "aams-resume-dev-pdf"
  "aams-cvviewer-resume-dev"
  "aams-cvviewer-resume-devops"
  "aams-cvviewer-resume-ts"
  "aams-cvviewer-resume-dataeng"
)

box_text "Pulling Docker images..."
for image in "${IMAGES[@]}"; do
  image_name="$DOCKERHUB_ID/$image:$DOCKER_TAG"
  echo "$image_name ..."
  docker pull $image_name
done
  
box_text "Total of ${#IMAGES[@]} docker images pulled successfully from dockerhub/$DOCKERHUB_ID!" 32