#!/bin/bash

# bin/main_script.sh


# Source the helper functions and configuration
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"


command="kubectl config get-contexts"

box_text "$command"
$command

