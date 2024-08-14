#!/bin/bash

# bin/main_script.sh

# Source the helper functions and configuration
source "$(dirname "$0")/../../lib/helper_functions.sh"
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"

# Check if a file/directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <file-or-directory> [source_path] [destination]"
  exit 1
fi

# Assign provided parameters or use defaults
FILE_OR_DIRECTORY=$1
DESTINATION_PATH=${2:-/tmp/scp}
DESTINATION_BOX=${3:-dgx-207}

PYTHON_SCRIPT=/Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/ahmed/scripts/python/ssh_connect.py
# PYTHON_SCRIPT=/Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/python/ssh_connect.py

# Execute the Python script with the provided or default parameters
box_text "File or Directory: $FILE_OR_DIRECTORY"
box_text "Source Path: $DESTINATION_PATH"
box_text "Destination: $DESTINATION_BOX"
python3.11 $PYTHON_SCRIPT --scp $FILE_OR_DIRECTORY $DESTINATION_PATH $DESTINATION_BOX
log "SCPing file/directory $FILE_OR_DIRECTORY to $DESTINATION_BOX:$DESTINATION_PATH done"