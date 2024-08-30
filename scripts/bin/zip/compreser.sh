#!/bin/bash

# Check if directory is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Set the directory to compress
DIR="$1"

# Check if directory exists
if [ ! -d "$DIR" ]; then
    echo "Error: Directory '$DIR' does not exist"
    exit 1
fi

# Get the directory name and the location of the script
DIR_NAME=$(basename "$DIR")
SCRIPT_DIR=$(dirname "$0")

# Set the output file path
OUTPUT="$SCRIPT_DIR/$DIR_NAME.zip"

# Compress the directory
zip -r "$OUTPUT" "$DIR"

# Display success message
if [ $? -eq 0 ]; then
    echo "Directory '$DIR' compressed successfully into '$OUTPUT'"
else
    echo "Error: Compression failed"
    exit 1
fi
