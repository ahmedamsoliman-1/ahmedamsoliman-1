#!/bin/bash

# Default configurations (You can customize these)
MINIKUBE_DRIVER="docker"             # Specify the driver (docker, virtualbox, hyperkit, etc.)
MINIKUBE_CPUS=2                      # Number of CPUs per node
MINIKUBE_MEMORY=2048                 # Memory allocated to each node (in MB)
MINIKUBE_DISK_SIZE="20g"             # Disk size for each node
NUMBER_OF_NODES=3                    # Number of nodes in the Minikube cluster

minikube start \
  --driver=${MINIKUBE_DRIVER} \
  --cpus=${MINIKUBE_CPUS} \
  --memory=${MINIKUBE_MEMORY} \
  --disk-size=${MINIKUBE_DISK_SIZE} \
  --nodes=${NUMBER_OF_NODES}

# Verify if Minikube started successfully
if [ $? -eq 0 ]; then
    echo "Minikube started successfully with ${NUMBER_OF_NODES} nodes."
else
    echo "Failed to start Minikube."
    exit 1
fi

# Optional: Display Minikube status
minikube status
