#!/bin/bash




command='kind delete cluster'


echo $command
$command



command_2='kind create cluster --image kindest/node:v1.29.4 --config /Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/k8/kind-config/kind.yaml'


echo $command_2
$command_2