#!/bin/bash

command='kind create cluster --image kindest/node:v1.29.4 --config kind.yaml'


echo $command
$command