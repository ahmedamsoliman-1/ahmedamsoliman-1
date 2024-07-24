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
TAG_3="0"

TAG="$TAG_1.$TAG_2.$TAG_3"

REGISTRY=harbor.dgx.io

PROJECT=nginxp
IMAGE_NAME=nginximage

USERNAME=ahmed
PASSWORD=Harbor12345ahmed

PLATFORM_AMD=linux/amd64
PLATFORM_ARM=linux/arm64


command="docker login $REGISTRY -u $USERNAME -p $PASSWORD"
box_text "LOGIN using [$command]"
$command

command="docker build --platform $PLATFORM_AMD -t $IMAGE_NAME:$TAG ."
box_text "BUILDING using [$command]"
$command

command="docker tag $IMAGE_NAME:$TAG $REGISTRY/$PROJECT/$IMAGE_NAME:$TAG"
box_text "TAGGING using [$command]"
$command

command="docker push $REGISTRY/$PROJECT/$IMAGE_NAME:$TAG"
box_text "PUSHING using [$command]"
$command

box_text "Image Summary Created"
echo "TAG: $TAG"
echo "REGISTRY: $REGISTRY"
echo "PROJECT: $PROJECT"
echo "IMAGE_NAME: $IMAGE_NAME"
