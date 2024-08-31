#!/bin/bash

KIND_YAML=/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/kubernetes/config/kind/kind.yaml

command="kind create cluster --image kindest/node:v1.29.4 --config $KIND_YAML"


echo $command
$command