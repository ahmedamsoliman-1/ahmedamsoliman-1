#!/bin/bash

# Define an array of ports to check
PORTS=(3000 3001 3002 3003 3004 3005 8080 80 81)

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
      # Add termination command if needed
    #   kill -9 "$pid"
    done
  fi
done
