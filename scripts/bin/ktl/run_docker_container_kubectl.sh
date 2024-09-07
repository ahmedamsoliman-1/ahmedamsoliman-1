#!/bin/bash

# Define variables
IMAGE_NAME="custom-utility-container"
CONTAINER_NAME="utility-container"
KUBECTL_VERSION="v1.28.0"  # Adjust to your desired kubectl version
DOCKERFILE_NAME="Dockerfile"

# # Create a Dockerfile
# cat <<EOF > $DOCKERFILE_NAME
# # Use an official Ubuntu as the base image
# FROM ubuntu:22.04

# # Install required packages
# RUN apt-get update && apt-get install -y \\
#     curl \\
#     telnet \\
#     ssh \\
#     openssh-client \\
#     ca-certificates \\
#     && rm -rf /var/lib/apt/lists/*

# # Install kubectl
# RUN curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl" \\
#     && chmod +x kubectl \\
#     && mv kubectl /usr/local/bin/kubectl

# # Set up SSH for root user
# RUN mkdir /root/.ssh && chmod 700 /root/.ssh

# # Set entry point
# ENTRYPOINT ["/bin/bash"]
# EOF

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# # Run the Docker container with the necessary capabilities
# echo "Running Docker container..."
# docker run -it --name $CONTAINER_NAME --rm \\
#     --network host \\
#     -v ~/.kube:/root/.kube \\
#     -v ~/.ssh:/root/.ssh:ro \\
#     $IMAGE_NAME


# docker run -it --rm -v ${HOME}:/root/ -v ${PWD}:/work -w /work --net host alpine sh
