#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <port>"
    exit 1
fi

port="$1"

# Check if any processes are running on the given port
pids=$(lsof -ti :$port)

if [ -z "$pids" ]; then
    echo "No processes are running on port $port"
    exit 0
fi

# List details of each process running on the port
for pid in $pids; do
    echo "Process with PID $pid is running on port $port:"
    ps -p $pid -o pid,ppid,cmd
    echo
done
