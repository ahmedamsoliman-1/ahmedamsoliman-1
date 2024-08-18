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


TAG_1="1"
TAG_2="1"
TAG_3="5"

TAG="$TAG_1.$TAG_2.$TAG_3"

REGISTRY=ahmedalimsolimansd
IMAGE_NAME=aams-links
APP_PATH=/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/nodejs/aams-links

PLATFORM_AMD=linux/amd64
PLATFORM_ARM=linux/arm64

command="docker build --platform $PLATFORM_AMD -t $IMAGE_NAME:$TAG $APP_PATH"
box_text "BUILDING using [$command]"
$command

command="docker tag $IMAGE_NAME:$TAG $REGISTRY/$IMAGE_NAME:$TAG"
box_text "TAGGING using [$command]"
$command

command="docker push $REGISTRY/$IMAGE_NAME:$TAG"
box_text "PUSHING using [$command]"
$command

box_text "Image Summary Created"
echo "TAG: $TAG"
echo "REGISTRY: $REGISTRY"
echo "IMAGE_NAME: $IMAGE_NAME"
