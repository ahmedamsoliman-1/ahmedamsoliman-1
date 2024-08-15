#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/../lib/helper_functions.sh"
source "$(dirname "$0")/../lib/utils.sh"

# Load configurations
source "$(dirname "$0")/../config/config_file.conf"



extensions=("*.aux" "*.fls" "*.fdb_latexmk" "*.synctex.gz" "*.toc" "*.pdf" "*.log")

# Initialize a flag to check if any files were deleted
files_deleted=false

# Loop through each extension and delete matching files in the current directory and nested directories
for ext in "${extensions[@]}"; do
  # Check if there are files to delete
  if find . -type f -name "$ext" | grep -q .; then
    find . -type f -name "$ext" -exec rm -f {} \;
    files_deleted=true
  fi
done

# Print appropriate message based on whether files were deleted or not
if $files_deleted; then
  box_text "All specified files have been deleted from the current directory and nested directories."
else
  box_text "No files found with the specified extensions."
fi
