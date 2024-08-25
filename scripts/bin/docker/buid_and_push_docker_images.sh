#!/bin/bash


APP_PATH="/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/"
IMAGES=(
  "portfolio"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/next-js/portfolio"
  "resume-dev-web"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/static/resume-dev-web"
  "react-app-simple"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/react/react-app-simple"
  "frontend-svc"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/nodejs/aams-links"
  "order-svc"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/nodejs/order-svc"
  "user-svc"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/nodejs/user-svc"
  "ahmedamsoliman-1"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/nodejs/ahmedamsoliman-1"
  "flask-1"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/python/flask/flask_app_1"
  "aams-cvviewer-resume-dev"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/typescript/aams-cvviewer-resume-dev"
  "aams-cvviewer-resume-dataeng"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/typescript/aams-cvviewer-resume-dataeng"
  "aams-cvviewer-resume-devops"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/typescript/aams-cvviewer-resume-devops"
  "aams-cvviewer-resume-ts"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/typescript/aams-cvviewer-resume-ts"
  "go-linktree-1"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/go/linktree"
  "aams-links"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/nodejs/aams-links"
  "auth-service"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/typescript/auth-service"
  "nodejs-ejs-auth"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/nodejs/nodejs-ejs-auth"
  "blog_app"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/nodejs/blog_app"
  "aams-fgallery"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/static/aams-fgallery"
  "aams-rgb-color-game"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/static/aams-rgb-color-game"
  "aams-aws-resource-viewer"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/react/aams-aws-resource-viewer"
  "aams-linktree-react"
  "/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/react/aams-linktree-react"
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
