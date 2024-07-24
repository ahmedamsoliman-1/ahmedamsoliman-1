#!/bin/bash

BASE_URL="http://localhost:3001"
# BASE_URL="http://cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com"


# http://localhost:3001/request-fen-v2?id=6ebd5390-45d3-4f7e-912c-f1ee18fdf85c&fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1
# Function to perform signup for each user
create_games() {
    for ((i = 1; i <= 10000; i++)); do
        curl -X GET "$BASE_URL/validate-move-v2?fen=4k3/8/7Q/8/3RKR2/8/8/8%20w%20-%20-%200%201&sourceSquare=h6&targetSquare=h7&id=6ebd5390-45d3-4f7e-912c-f1ee18fdf85c"
    done
}



# Call the function to perform signups
create_games
