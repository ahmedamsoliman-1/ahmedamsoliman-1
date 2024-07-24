# kubectl -n paperless exec -it pod/paperless-ngx-f84fc64ff-78dpj -- python manage.py createsuperuser
# kubectl -n paperless exec -it pod/paperless-ngx-f84fc64ff-pgq2s -- python manage.py createsuperuser



#!/bin/bash

# Namespace
NAMESPACE="paperless"

# Get the pod name dynamically
POD_NAME=$(kubectl -n $NAMESPACE get pods -l app=paperless-ngx -o jsonpath='{.items[0].metadata.name}')

# Execute the command on the fetched pod name
kubectl -n $NAMESPACE exec -it pod/$POD_NAME -- python manage.py createsuperuser

