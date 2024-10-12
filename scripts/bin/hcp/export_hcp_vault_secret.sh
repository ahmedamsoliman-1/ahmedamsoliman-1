#!/bin/bash


source "$(dirname "$0")/../../lib/utils.sh"
source "$(dirname "$0")/../../config/config.sh"


box_text "Fetch the secret from HCP Vault and extract the value using jq"
GG=$(hcp vault-secrets secrets open GG --format=json | jq -r '.static_version.value')
AAMS_GLOBAL=$(hcp vault-secrets secrets open AAMS_GLOBAL --format=json | jq -r '.static_version.value')

box_text "Export the secret as an environment variable"
export GG=$GG
export AAMS_GLOBAL=$AAMS_GLOBAL




box_text "GG"
echo $GG
box_text "AAMS_GLOBAL"
echo -n "$AAMS_GLOBAL" | pbcopy
