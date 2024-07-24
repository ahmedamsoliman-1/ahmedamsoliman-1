#!/bin/bash

# IP address and port to check
IP_ADDRESS="10.172.223.208"
PORT="22"

# ANSI color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

while true; do
    # Try to connect to the IP address and port
    telnet "$IP_ADDRESS" "$PORT"

    # Check the exit status of nc
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Connection to $IP_ADDRESS:$PORT successful.${NC}"
    else
        echo -e "${RED}Connection to $IP_ADDRESS:$PORT failed. Retrying in 5 seconds...${NC}"
        sleep 5
        continue
    fi

    # Additional code you want to run after successful connection
    echo "Succeeded!"
    sleep 100
done
