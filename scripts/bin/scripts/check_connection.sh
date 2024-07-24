#!/bin/bash

RED='\033[0;31m' # ANSI color code for red
GREEN='\033[0;32m' # ANSI color code for green
NC='\033[0m' # ANSI color code to reset text color



Localhost="localhost"
UbuntuPC="10.172.223.208"
MacBook="10.172.219.172"
Front_End_EC2="172.27.89.33"
Back_End_EC2="172.27.88.248"
CassandraBeta="172.27.88.248"
CassandraAlpha="172.27.89.125"
Redis="172.27.88.205"
TraininUI="172.22.19.189"
ES="172.22.19.240"
Jumpbox="10.10.11.11"
Rabbit="172.22.19.221"
Jenkins='172.27.89.87'

engine_1="172.27.89.16"
engine_2="172.27.88.241"
engine_3="172.27.89.94"

backend_1="172.27.89.100"
backend_2="172.27.89.29"
backend_3="172.27.88.231"

# frontend_1="172.27.89.120"
# frontend_2="172.27.89.32"
# frontend_3="172.27.88.209"


frontend_1="172.27.89.26"
frontend_2="172.27.88.208"
frontend_3="172.27.89.107"

Engine_NLB="cs2-platform-engine-svc-nlb-de2bf748ffbdbc4e.elb.me-central-1.amazonaws.com"
Backend_NLB="cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com"
Frontend_NLB="internal-cs2-platform-frontend-svc-alb-201962685.me-central-1.elb.amazonaws.com"


SSH_PORT_22=22
Cassandra_PORT_9042=9042
ES_PORT_9200=9200
Redis_PORT_6379=6379
Rabbit_PORT_5671=5671

PORT_3000=3000
PORT_3001=3001
PORT_80=80
PORT_8080=8080
PORT_443=443




if [[ $(uname) == "Darwin" ]]; then
    host_IP=$(ipconfig getifaddr en0) # Change en0 to your relevant interface
else
    host_IP=$(hostname -I | cut -d' ' -f1)
fi

host=$(hostname)


echo "UbuntuPC: $UbuntuPC"
echo "MacBook: $MacBook"
# check_connection() {
#     if (echo >/dev/tcp/$1/$2) &>/dev/null; then
#         printf "| %-15s | %-15s | %-20s | \e[0;32mConnection successful\e[0m |\n" "$3" "$1" "$2"
#     else
#         printf "| %-15s | %-15s | %-20s | \e[0;31mConnection failed\e[0m     |\n" "$3" "$1" "$2"
#     fi
# }

check_connection() {
    if (echo >/dev/tcp/$1/$2) &>/dev/null; then
        printf "| %-14s | %-15s | %-20s | \e[0;32mConnection successful\e[0m from ${host} at ${host_IP}|\n" "$3" "$1" "$2"
    else
        printf "| %-14s | %-15s | %-20s | \e[0;31mConnection failed\e[0m from ${host} at ${host_IP}\n" "$3" "$1" "$2"
    fi
}

printf "+-----------------+-----------------+----------------------+-----------------------+\n"
printf "|   Hostname      |   IP Address    |   Port               |   Connection          |\n"
printf "+-----------------+-----------------+----------------------+-----------------------+\n"


check_connection $Front_End_EC2 $SSH_PORT_22 "Front_End_EC2" 
check_connection $Back_End_EC2 $SSH_PORT_22 "Back_End_EC2" 
check_connection $TraininUI $SSH_PORT_22 "TraininUI" 
check_connection $Jumpbox $SSH_PORT_22 "Jumpbox" 
check_connection $UbuntuPC $SSH_PORT_22 "UbuntuPC" 
check_connection $CassandraBeta $SSH_PORT_22 "CassandraBeta_SSH" 
check_connection $CassandraAlpha $SSH_PORT_22 "CassandraAlpha_SSH" 
check_connection $Redis $SSH_PORT_22 "Redis_SSH" 
check_connection $Jenkins $SSH_PORT_22 "Jenkins_SSH" 

printf "+-----------------+-----------------+----------------------+-----------------------+\n"


# check_connection $Engine $PORT_80 "Engine"

# check_connection $Front_End_EC2 $PORT_80 "Frontend 80" 
# check_connection $Back_End_EC2 $PORT_80 "Backend 80" 

# printf "+-----------------+-----------------+----------------------+-----------------------+\n"

# check_connection $Front_End_EC2 $PORT_3000 "Frontend 3000"
# check_connection $Back_End_EC2 $PORT_3000 "Backend 3000"

# printf "+-----------------+-----------------+----------------------+-----------------------+\n"

# check_connection $Front_End_EC2 $PORT_3001 "Frontend 3001"
# check_connection $Back_End_EC2 $PORT_3001 "Backend 3001"

# printf "+-----------------+-----------------+----------------------+-----------------------+\n"


check_connection $Front_End_EC2 $PORT_443 "Frontend 443"
check_connection $Back_End_EC2 $PORT_443 "Backend 443"
check_connection $TraininUI $PORT_443 "Training UI 443"


printf "+-----------------+-----------------+----------------------+-----------------------+\n"


# check_connection $Engine $PORT_8080 "Engine 8080"



check_connection $CassandraBeta $Cassandra_PORT_9042 "Cassandra Beta" 
check_connection $CassandraAlpha $Cassandra_PORT_9042 "Cassandra Alpha"  
check_connection $Redis $Redis_PORT_6379 "Redis" 
check_connection $ES $ES_PORT_9200 "Elastic Search"
check_connection $Rabbit $Rabbit_PORT_5671 "Rabbit MQ"
check_connection $Jenkins $PORT_443 "Jenkins Chess"

# check_connection $TraininUI $PORT_80 "TraininUI" 
# check_connection $ES $ES_PORT_9200 "ES" 

# check_connection $UbuntuPC $PORT_3000 "UbuntuPC" 
# check_connection $UbuntuPC $PORT_80 "UbuntuPC" 


# check_connection $Front_End_EC2 $PORT_3000 "Front_End_EC2" 
# check_connection $Front_End_EC2 $PORT_443 "Front_End_EC2" 
# # check_connection $Front_End_EC2 $PORT_3001 "Front_End_EC2" 
# # check_connection $Front_End_EC2 $PORT_80 "Front_End_EC2" 

# check_connection $Engine $PORT_8080 "Engine 8080"
# check_connection $Back_End_EC2 $PORT_3001 "Back_End_EC2" 
# check_connection $Back_End_EC2 $PORT_443 "Back_End_EC2" 
# check_connection $Back_End_EC2 $PORT_3000 "Back_End_EC2" 
# check_connection $Back_End_EC2 $PORT_80 "Back_End_EC2" 


printf "+-----------------+-----------------+----------------------+----------------------+\n"

check_connection $engine_1 $PORT_80 "engine_1"
check_connection $engine_2 $PORT_80 "engine_2"
check_connection $engine_3 $PORT_80 "engine_3"

printf "+-----------------+-----------------+----------------------+-----------------------+\n"

check_connection $backend_1 $PORT_80 "backend_1"
check_connection $backend_2 $PORT_80 "backend_2"
check_connection $backend_3 $PORT_80 "backend_3"

printf "+-----------------+-----------------+----------------------+-----------------------+\n"

check_connection $frontend_1 $PORT_80 "frontend_1"
check_connection $frontend_2 $PORT_80 "frontend_2"
check_connection $frontend_3 $PORT_80 "frontend_3"


printf "+-----------------+-----------------+----------------------+----------------------+\n"

check_connection $Frontend_NLB $PORT_80 "Frontend_NLB"
check_connection $Backend_NLB $PORT_80 "Backend_NLB"
check_connection $Engine_NLB $PORT_80 "Engine_NLB"


printf "+-----------------+-----------------+----------------------+----------------------+\n"

# #!/bin/bash

# RED='\033[0;31m' # ANSI color code for red
# GREEN='\033[0;32m' # ANSI color code for green
# NC='\033[0m' # ANSI color code to reset text color

# Localhost="localhost"
# UbuntuPC="10.172.223.208"
# MacBook="10.172.219.172"
# Front_End_EC2="172.27.89.33"
# Back_End_EC2="172.27.88.248"
# Cassandra="172.27.89.125"
# Redis="172.27.88.205"
# TUI="172.22.19.189"
# ES="172.22.19.240"
# Jumpbox="10.10.11.11"

# SSH_PORT_22=22
# Cassandra_PORT_9042=9042
# ES_PORT_9200=9200
# Redis_PORT_6379=6379

# PORT_3000=3000
# PORT_3001=3001
# PORT_80=80
# PORT_8080=8080
# PORT_443=443

# # check_connection() {
# #     echo -n "Checking connection to $1 on port $2 "
# #     if (echo >/dev/tcp/$1/$2) &>/dev/null; then
# #         echo -e "${GREEN}Connection successful${NC}"
# #     else
# #         echo -e "${RED}Connection failed${NC}"
# #     fi
# # }

# check_connection() {
#     if (echo >/dev/tcp/$1/$2) &>/dev/null; then
#         printf "| %-15s | %-15s | \e[0;32mConnection successful\e[0m |\n" "$1" "$2"
#     else
#         printf "| %-15s | %-15s | \e[0;31mConnection failed\e[0m     |\n" "$1" "$2"
#     fi
# }

# printf "+-----------------+-----------------+----------------------+\n"
# printf "|   Host          |   Port          |   Status             |\n"
# printf "+-----------------+-----------------+----------------------+\n"

# check_connection $Front_End_EC2 $SSH_PORT_22
# check_connection $Back_End_EC2 $SSH_PORT_22
# check_connection $Cassandra $Cassandra_PORT_9042
# check_connection $Redis $Redis_PORT_6379

# check_connection $TUI $SSH_PORT_22
# check_connection $TUI $PORT_80
# check_connection $ES $ES_PORT_9200
# check_connection $Jumpbox $SSH_PORT_22

# check_connection $UbuntuPC $SSH_PORT_22 
# check_connection $UbuntuPC $PORT_3000
# check_connection $UbuntuPC $PORT_80

# check_connection $MacBook $SSH_PORT_22 
# check_connection $MacBook $PORT_3000
# check_connection $MacBook $PORT_80

# check_connection $Localhost $SSH_PORT_22 
# check_connection $Localhost $PORT_3000
# check_connection $Localhost $PORT_80


# check_connection $Front_End_EC2 $PORT_3000
# check_connection $Front_End_EC2 $PORT_80
# check_connection $Front_End_EC2 $PORT_443


# check_connection $Back_End_EC2 $PORT_3000
# check_connection $Back_End_EC2 $PORT_80
# check_connection $Back_End_EC2 $PORT_443

# printf "+-----------------+-----------------+----------------------+\n"

