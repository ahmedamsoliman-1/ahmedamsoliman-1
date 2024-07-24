#!/bin/bash

# Function to log messages
log() {
    local msg="$1"
    echo "$(date +'%Y-%m-%d %H:%M:%S') : $msg" >> "/Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/bash/logs/script1.log"
    # echo "$(date +'%Y-%m-%d %H:%M:%S') : $msg" >> "$(dirname "$0")/../logs/script1.log"
}

# Example helper function
say_hello() {
    echo "Hello, $1!"
}

