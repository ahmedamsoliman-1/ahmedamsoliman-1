#!/bin/bash

# bin/main_script.sh


# Source the helper functions and configuration
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"


command="rm /Users/ahmed.soliman/.kube/config"
command1="cp /Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/ahmed/kubernetes/kube/dgx-config /Users/ahmed.soliman/.kube/config"
command2="kubectl describe nodes"
command3="kubectl get nodes"

box_text "$command"
$command

box_text "$command1"
$command1

box_text "$command2"
$command2

box_text "$command3"
$command3