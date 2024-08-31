#!/bin/bash

# Default configurations (You can customize these)
REGISTRY_NAME="local-registry"
REGISTRY_PORT="5000"
REGISTRY_VOLUME_PATH="./volumes"
REGISTRY_IMAGE="registry:2"

# Create a directory for the registry data
mkdir -p ${REGISTRY_VOLUME_PATH}

# Run the local Docker registry
docker run -d \
  --name ${REGISTRY_NAME} \
  -p ${REGISTRY_PORT}:5000 \
  -v ${REGISTRY_VOLUME_PATH}:/var/lib/registry \
  ${REGISTRY_IMAGE}

# Verify if the registry is running
if [ $? -eq 0 ]; then
    echo "Local Docker registry started successfully."
    echo "Registry URL: http://localhost:${REGISTRY_PORT}"
else
    echo "Failed to start the local Docker registry."
    exit 1
fi

# Optionally, you can push and pull images to test the registry
# Example: Tagging and pushing an image
# docker tag my-image:latest localhost:5000/my-image:latest
# docker push localhost:5000/my-image:latest

# Example: Pulling an image from the local registry
# docker pull localhost:5000/my-image:latest
