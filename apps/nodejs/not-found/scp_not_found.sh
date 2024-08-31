#!/bin/bash


# Function to display text in a colored box
function box_text {
  local message=$1
  local color=${2:-32}  # Default color is green (32)
  echo -e "\033[${color}m${message}\033[0m"
}




box_text "Scp dir with execlude"
rm -r node_modules
scp -r . dgx-207:/home/devops/aams/scp/not-found