#!/bin/bash

REQUESTS=100

URL='http://localhost:3000/'

for ((i=1; i<=REQUESTS; i++)); do
    curl $URL &
done


wait
echo "All done"