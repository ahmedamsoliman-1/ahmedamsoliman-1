#!/bin/zsh

# Redis server hostname or IP address
REDIS_HOST="172.27.88.205"

# Redis server port
REDIS_PORT="6379"

# Redis server password
REDIS_PASSWORD="05T76BsOI1YjneFB"

# Check if redis-cli is installed
if ! command -v redis-cli &> /dev/null; then
    echo "redis-cli is not installed. Please install Redis client."
    exit 1
fi

# Connect to Redis server with password
redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD

redis-cli -h 172.27.88.205 -p 6379 -a 05T76BsOI1YjneFB