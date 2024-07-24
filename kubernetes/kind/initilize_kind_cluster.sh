#!/bin/bash

command='kind create cluster --image kindest/node:v1.29.4 --config /Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/ahmed/kubernetes/kind-config/kind.yaml'


echo $command
$command