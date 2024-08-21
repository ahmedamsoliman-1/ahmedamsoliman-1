#!/bin/bash
#!/bin/bash

# bin/main_script.sh


# Source the helper functions and configuration
source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"


# Get a list of all contexts
contexts=$(kubectl config get-contexts -o name)

# Display the list of contexts
echo "Available Kubernetes contexts:"
select context in $contexts; do
  if [[ -n "$context" ]]; then
    echo "You selected context: $context"
    kubectl config use-context "$context"
    break
  else
    echo "Invalid selection. Please choose a valid context."
  fi
done

command="kubectl config get-clusters"
box_text "$command"
$command

command="kubectl config get-contexts"
box_text "$command"
$command

command="kubectl get nodes"
box_text "$command"
$command