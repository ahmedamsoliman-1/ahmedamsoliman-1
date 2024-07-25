#!/bin/bash

# Check if the script is run with root privileges
# if [ "$EUID" -ne 0 ]; then
#   echo "Please run this script as root (sudo) to stop services on port 3000."
#   exit 1
# fi

# Find the processes running on port 3000

PORT=80
PID_LIST=$(sudo lsof -ti :$PORT)

# Check if any process is using the specified port
if [ -z "$PID_LIST" ]; then
  echo "No services are running on port $PORT."
else
  # Terminate each process using the port
  for pid in $PID_LIST; do
    echo "Stopping process with PID: $pid"
    sudo kill "$pid"
  done
fi


sudo npm start