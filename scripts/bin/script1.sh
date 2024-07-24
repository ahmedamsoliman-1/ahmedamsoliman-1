#!/bin/bash

# Source the helper functions
source "$(dirname "$0")/../lib/helper_functions.sh"
source "$(dirname "$0")/../lib/utils.sh"

# Load configurations
source "$(dirname "$0")/../config/config_file.conf"

# Main function
main() {
    # box_text "D"
    log "Starting script1"
    # Add your script logic here
    log "Ending script1"
}

# Call the main function
main
