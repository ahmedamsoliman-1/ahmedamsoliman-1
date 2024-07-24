#!/bin/bash

# bin/main_script.sh


# Source the helper functions and configuration
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"


command="kubectl config use-context kubernetes-admin@kubernetes"
command2="kubectl describe nodes"
command3="kubectl get nodes"

box_text "$command"
$command

box_text "$command2"
$command2

box_text "$command3"
$command3