#!/bin/bash

BASE_URL="http://10.172.219.172:3001"
BASE_URL="http://localhost:3001"

# BASE_URL="http://cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com"

# Function to perform signup for each user
perform_signup() {
    for ((i = 1; i <= 4000000; i++)); do
        username="mohammed$i"
        email="mohammed$i"
        password="password$i"  # You might want unique passwords for each user

        # Perform POST request to sign up the user with parameters in the URL
        curl -X POST "$BASE_URL/cs2-auth/signup?username=$username&email=$email&password=$password"
        echo "\n"

    done
}

# Call the function to perform signups
perform_signup
