#!/bin/bash

# Define an array of ports to check
PORTS=(6379)

for PORT in "${PORTS[@]}"
do
  PID_LIST=$(lsof -ti :$PORT)

  # Check if any process is using the specified port
  if [ -z "$PID_LIST" ]; then
    echo "No services are running on port $PORT."
  else
    # Terminate each process using the port
    for pid in $PID_LIST; do
      echo "Services running with PID: $pid in port ($PORT)"
      sudo kill -9 "$pid"
    done
  fi
done
