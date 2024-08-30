#!/bin/bash

NAMESPACES=("omnium-namespace-alpha" "omnium-namespace-beta") 

CERT_FILE="/home/devops/aams/certs/avrioc.iobundle.crt"
# CERT_FILE=/Users/ahmed.soliman/workspace/cs2/certs/avrioc.iobundle.crt"

# Secret name
SECRET_NAME="es-avrioc-iobundle-certificate"

# Loop through each namespace and create the secret
for NAMESPACE in "${NAMESPACES[@]}"; do
  echo "Creating secret $SECRET_NAME in namespace $NAMESPACE..."
  kubectl create secret generic $SECRET_NAME \
    --namespace $NAMESPACE \
    --from-file=avrioc.iobundle.crt=$CERT_FILE \
    --dry-run=client -o yaml | kubectl apply -f -
  
  if [ $? -eq 0 ]; then
    echo "Secret $SECRET_NAME created successfully in namespace $NAMESPACE."
  else
    echo "Failed to create secret $SECRET_NAME in namespace $NAMESPACE."
  fi
done

echo "Secret creation process completed."

    # spec:
    #   containers:
    #   - name: flask-elasticsearch
    #     image: 10.10.25.207:5000/flask2:1.1.5
    #     resources:
    #       requests:
    #         cpu: 1000m
    #         memory: 1024Mi
    #       limits:
    #         cpu: 2000m
    #         memory: 2048Mi
    #     ports:
    #     - containerPort: 5000
    #     env:
    #     - name: ES_CERT
    #       value: "/etc/certs/avrioc.iobundle.crt"
    #     volumeMounts:
    #     - name: cert-volume
    #       mountPath: /etc/certs
    #   volumes:
    #   - name: cert-volume
    #     secret:
    #       secretName: es-avrioc-io-certificate