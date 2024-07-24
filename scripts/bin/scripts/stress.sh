#!/bin/bash

# Define the base URL of your server

BASE_URL="http://10.172.219.172:3001"
# BASE_URL="http://localhost:3001"

# Percentage of the requests served within a certain time (ms)
#   50%      4
#   66%      4
#   75%      5
#   80%      6
#   90%      8
#   95%      9
#   98%      9
#   99%      9
#  100%      9 (longest request)
# --------------------------------------

# BASE_URL="http://cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com"
# Percentage of the requests served within a certain time (ms)
#   50%     65
#   66%     78
#   75%     82
#   80%     88
#   90%    135
#   95%    160
#   98%    170
#   99%    179
#  100%    179 (longest request)
# --------------------------------------

# Define the routes you want to test
ROUTES=(
    "/"
    "/start-game-v2"
    "/start-game-v2"
)

# Function to perform tests for each route
perform_test() {
    for ROUTE in "${ROUTES[@]}"
    do
        echo "Testing $ROUTE"
        ab -n 1000 -c 10 "$BASE_URL$ROUTE"
        echo "--------------------------------------"
    done
}

# Call the function to perform tests
perform_test
