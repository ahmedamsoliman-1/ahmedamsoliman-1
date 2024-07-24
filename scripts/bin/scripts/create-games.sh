#!/bin/bash

BASE_URL="http://10.172.219.172:3001"
BASE_URL="http://localhost:3001"
# BASE_URL="http://cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com"

# Function to perform signup for each user
create_games() {
    for ((i = 4001; i <= 4000000; i++)); do
        curl -X GET "$BASE_URL/start-game-v2"
    done
}

# Call the function to perform signups
create_games
