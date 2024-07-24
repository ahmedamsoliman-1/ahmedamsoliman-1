#!/bin/bash

BASE_URL="http://localhost:3001"
# BASE_URL="http://cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com"

# Function to perform signup for each user
stresser() {
    for ((i = 1; i <= 1; i++)); do
        username="ahmed$i"
        password="password$i" 

        curl -X DELETE "$BASE_URL/cs2-mangement/delete-all-players"
        curl -X DELETE "$BASE_URL/cs2-mangement/delete-all-games"
        curl -X DELETE "$BASE_URL/cs2-mangement/delete-all-logs"
        
    
        echo "\n"

    done
}

# Call the function to perform signups
stresser
