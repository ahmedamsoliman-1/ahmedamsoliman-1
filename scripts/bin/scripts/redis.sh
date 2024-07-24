#!/bin/bash

# Function to display script usage
usage() {
    echo "Usage: $0 <instance_name>"
    echo "Example: $0 instance1"
    exit 1
}

# Check if the instance name is provided as a parameter
if [ $# -ne 1 ]; then
    usage
fi

# Define Redis server connection details based on the provided instance name
case "$1" in
    cs2)
        REDIS_HOST="172.27.88.205"
        REDIS_PORT="6379"
        REDIS_PASSWORD="$REDIS_PASSWORD"
        ;;
    localhost)
        REDIS_HOST="localhost"
        REDIS_PORT="6379"
        ;;
    127)
        REDIS_HOST="127.0.0.1"
        REDIS_PORT="6379"
        ;;
    local)
        REDIS_HOST="localhost"
        REDIS_PORT="6379"
        REDIS_PASSWORD="ggimdalbit"

        ;;
    *)
        echo "Unknown instance name: $1"
        usage
        ;;
esac



# Connect to Redis server using redis-cli
if [ -z "$REDIS_PASSWORD" ]; then
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" INFO | grep redis_version
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" INFO | grep role
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" INFO | grep used_cpu_sys
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT"
else
    # Password required
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" -a "$REDIS_PASSWORD" INFO | grep redis_version
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" -a "$REDIS_PASSWORD" INFO | grep role
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" -a "$REDIS_PASSWORD" INFO | grep used_cpu_sys
    redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" -a "$REDIS_PASSWORD"
fi
