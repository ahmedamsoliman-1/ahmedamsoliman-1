#!/bin/bash


APP_PATH="/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps"
NEXTJS="next-js"
DOTNET="dotnet"
GO="go"
NODEJS="nodejs"
TYPESCRIPT="typescript"
REACT="react"
STATIC="static"
PYTHON="python/flask"

IMAGES=(
  "aams-glinktree"
  "${APP_PATH}/${GO}/aams-glinktree"
  "portfolio"
  "${APP_PATH}/${NEXTJS}/portfolio"
  "aams-dotnet-web-app-1"
  "${APP_PATH}/${DOTNET}/aams-dotnet-web-app-1"
  "frontend-svc"
  "${APP_PATH}/${NODEJS}/aams-links"
  "order-svc"
  "${APP_PATH}/${NODEJS}/order-svc"
  "user-svc"
  "${APP_PATH}/${NODEJS}/user-svc"
  "ahmedamsoliman-1"
  "${APP_PATH}/${NODEJS}/ahmedamsoliman-1"
  "aams-links"
  "${APP_PATH}/${NODEJS}/aams-links"
  "nodejs-ejs-auth"
  "${APP_PATH}/${NODEJS}/nodejs-ejs-auth"
  "blog_app"
  "${APP_PATH}/${NODEJS}/blog_app"
  "auth-service"
  "${APP_PATH}/${TYPESCRIPT}/auth-service"
  "aams-cvviewer-resume-dev"
  "${APP_PATH}/${TYPESCRIPT}/aams-cvviewer-resume-dev"
  "aams-cvviewer-resume-dataeng"
  "${APP_PATH}/${TYPESCRIPT}/aams-cvviewer-resume-dataeng"
  "aams-cvviewer-resume-devops"
  "${APP_PATH}/${TYPESCRIPT}/aams-cvviewer-resume-devops"
  "aams-cvviewer-resume-ts"
  "${APP_PATH}/${TYPESCRIPT}/aams-cvviewer-resume-ts"
  "react-app-simple"
  "${APP_PATH}/${REACT}/react-app-simple"
  "aams-aws-resource-viewer"
  "${APP_PATH}/${REACT}/aams-aws-resource-viewer"
  "aams-linktree-react"
  "${APP_PATH}/${REACT}/aams-linktree-react"
  "resume-dev-web"
  "${APP_PATH}/${STATIC}/resume-dev-web"
  "aams-fgallery"
  "${APP_PATH}/${STATIC}/aams-fgallery"
  "aams-rgb-color-game"
  "${APP_PATH}/${STATIC}/aams-rgb-color-game"
  "flask-app-1"
  "${APP_PATH}/${PYTHON}/flask-app-1"
)


# Function to display text in a colored box
function box_text {
  local message=$1
  local color=${2:-32}  # Default color is green (32)
  echo -e "\033[${color}m${message}\033[0m"
}

box_text "Build and push images to Docker Hub"

TAG_1="1"
TAG_2="1"
TAG_3="6"

DOCKER_TAG="$TAG_1.$TAG_2.$TAG_3"

REGISTRY=ahmedalimsolimansd
PLATFORM_AMD=linux/amd64
PLATFORM_ARM=linux/arm64

# Iterate over the images array
for ((i=0; i<${#IMAGES[@]}; i+=2)); do
  image_name="${IMAGES[i]}"
  image_path="${IMAGES[i+1]}"
  
  full_image_name="$REGISTRY/$image_name:$DOCKER_TAG"
  
  box_text "Building $full_image_name ..."
  box_text "Image path: $image_path"
  
  # Build the image
  docker build --platform $PLATFORM_AMD -t $full_image_name $image_path
  
  # Push the image to Docker Hub
  docker push $full_image_name
done
