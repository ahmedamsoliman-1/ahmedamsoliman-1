#!/bin/bash

source "$(dirname "$0")/../../lib/helper_functions.sh"
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"


# Check if argument is provided
if [ -z "$2" ]; then
  echo "Usage: $0 <file-or-directory> <selected dgx box>"
  exit 1
fi

box_text "command: $1"
box_text "dgx: $2"

python3.11 ~/workspace/ahmed/aams-ahmedamsoliman-1/python/ssh_connect.py --command "$1" dgx-$2
log "Command '$1' executd successfully on 'dgx-$2'"