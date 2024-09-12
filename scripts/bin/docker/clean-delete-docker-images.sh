#!/bin/bash

function box_text {
  local message=$1
  local color=${2:-32}  # Default color is green (32)
  echo -e "\033[${color}m${message}\033[0m"
}

# Function to print usage instructions
usage() {
    echo "Usage: $0 [-p pattern] [-r]"
    echo "  -p pattern  Specify the pattern to match image names (e.g., 'myapp')"
    echo "  -r          Remove images matching the pattern (without prompting)"
    exit 1
}

# Parse command line options
REMOVE=false
while getopts ":p:r" opt; do
    case ${opt} in
        p)
            PATTERN=$OPTARG
            ;;
        r)
            REMOVE=true
            ;;
        \?)
            usage
            ;;
    esac
done

# Check if the pattern was provided
if [ -z "$PATTERN" ]; then
    usage
fi

# List matching images
echo "Listing images matching pattern: $PATTERN"
IMAGES=$(docker images --format "{{.Repository}}:{{.Tag}} {{.ID}}" | grep "$PATTERN")

if [ -z "$IMAGES" ]; then
    echo "No images found matching the pattern: $PATTERN"
    exit 0
fi

echo "$IMAGES"

# Ask for confirmation before deleting, unless -r option is provided
if [ "$REMOVE" = true ]; then
    echo "Deleting images..."
    echo "$IMAGES" | while read -r IMAGE; do
        IMAGE_ID=$(echo $IMAGE | awk '{print $2}')
        box_text "Deleting image: $IMAGE_ID" 31
        # docker rmi $IMAGE_ID
    done
    echo "Images deleted."
else
    read -p "Do you want to delete these images? (y/N): " CONFIRM
    if [[ "$CONFIRM" =~ ^[Yy]$ ]]; then
        echo "$IMAGES"
        echo "$IMAGES" | while read -r IMAGE; do
            IMAGE_ID=$(echo $IMAGE | awk '{print $2}')
            box_text "Deleting image: $IMAGE_ID" 31
            docker rmi $IMAGE_ID
        done
        echo "Images deleted."
    else
        echo "Operation cancelled."
    fi
fi
