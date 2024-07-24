#!/bin/bash

BASE_URL="http://10.172.219.172:3001"
# BASE_URL="http://cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com"


# http://localhost:3001/request-fen-v2?id=6ebd5390-45d3-4f7e-912c-f1ee18fdf85c&fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1
# Function to perform signup for each user
create_games() {
    for ((i = 1; i <= 1000; i++)); do
        curl -X GET "$BASE_URL/request-fen-v2?id=0002c1c8-8ba5-4a68-ae0f-f05d0a3c4e7b&fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20-%20-%200%201"
        echo "Game $i created"
        echo '----------------'
    done
}

# Call the function to perform signups
create_games
