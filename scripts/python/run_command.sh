#!/bin/bash

# Check if argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <argument>"
    exit 1
fi

ARGUMENT="$1"  # Quote the variable to preserve spaces
echo "$ARGUMENT"

# ~/aams/gener-token.sh

python3.11 $HOME/workspace/ahmed/ahmedamsoliman-1/scripts/python/ssh_connect.py --command "$ARGUMENT" dgx-207
