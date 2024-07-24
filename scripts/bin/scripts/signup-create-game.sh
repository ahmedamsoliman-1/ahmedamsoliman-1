#!/bin/bash

BASE_URL="http://localhost:3001"
# BASE_URL="http://cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com"

# Function to perform signup for each user
stresser() {
    for ((i = 1; i <= 9000000; i++)); do
        username="ahmed$i"
        password="password$i" 
        email="email$i" 

        curl -X POST "$BASE_URL/cs2-auth/signup?username=$username&password=$password&email=$email"
        echo "\n"
        curl -X POST "$BASE_URL/cs2-auth/login?username=$username&password=$password"
        echo "\n"
        curl -X POST "$BASE_URL/cs2-auth/logout?username=$username"
        echo "\n"


        curl -X PUT "$BASE_URL/cs2-management/update-user?requested_field_to_update=first_name&username=$username&new_value=Ahmed"
        echo "\n"
        curl -X PUT "$BASE_URL/cs2-management/update-user?requested_field_to_update=last_name&username=$username&new_value=Soliman"
        echo "\n"
        curl -X PUT "$BASE_URL/cs2-management/update-user?requested_field_to_update=email&username=$username&new_value=ahmedd-3010@hotmail.net"
        echo "\n"
        curl -X PUT "$BASE_URL/cs2-management/update-user?requested_field_to_update=gender&username=$username&new_value=m"
        echo "\n"
        curl -X PUT "$BASE_URL/cs2-management/update-user?requested_field_to_update=preferred_color&username=$username&new_value=white"
        echo "\n"
        curl -X PUT "$BASE_URL/cs2-management/update-user?requested_field_to_update=preferred_opening&username=$username&new_value=red"
        echo "\n"

        curl -X POST "$BASE_URL/create-game?player_color=white&opponent_id=V1&username=$username"
        echo "\n"

        curl -X GET "$BASE_URL/new-game"
        echo "\n"
        curl -X GET "$BASE_URL/possible-moves?sourceSquare=d2" 
        echo "\n"
        curl -X GET "$BASE_URL/new-game"
        echo "\n"

        curl -X GET "$BASE_URL/validate-move?sourceSquare=a2&targetSquare=a5&fen=start"
        echo "\n"
        curl -X GET "$BASE_URL/cs2-mangement/get-user?username=$username"
        echo "\n"

    done
}

# Call the function to perform signups
stresser
