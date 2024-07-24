#!/bin/bash


# kubectl edit configmap -n kube-system kube-proxy
# and set: 
# apiVersion: kubeproxy.config.k8s.io/v1alpha1
# kind: KubeProxyConfiguration
# mode: "ipvs"
# ipvs:
#   strictARP: true

wget https://raw.githubusercontent.com/metallb/metallb/v0.14.5/config/manifests/metallb-native.yaml

kubectl apply -f metallb-native.yaml


kubectl get ns
