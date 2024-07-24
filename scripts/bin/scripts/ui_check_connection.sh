#!/bin/bash

RED='\033[0;31m' # ANSI color code for red
GREEN='\033[0;32m' # ANSI color code for green
NC='\033[0m' # ANSI color code to reset text color

if [[ $(uname) == "Darwin" ]]; then
    host_IP=$(ipconfig getifaddr en0) # Change en0 to your relevant interface
else
    host_IP=$(hostname -I | cut -d' ' -f1)
fi

host=$(hostname)

Cassandra="172.27.89.125"
Redis="172.27.88.205"
ES="172.22.19.240"
Rabbit="172.22.19.221"

Cassandra_PORT_9042=9042
ES_PORT_9200=9200
Redis_PORT_6379=6379
Rabbit_PORT_5671=5671

check_connection() {
    if (echo >/dev/tcp/$1/$2) &>/dev/null; then
        printf "| %-14s | %-15s | %-20s | \e[0;32mConnection successful\e[0m from ${host} at ${host_IP}|\n" "$3" "$1" "$2"
    else
        printf "| %-14s | %-15s | %-20s | \e[0;31mConnection failed\e[0m from ${host} at ${host_IP}\n" "$3" "$1" "$2"
    fi
}

# Determine the length of the hostname to adjust table formatting
hostname_length=${#host}
# Adjust the width for the hostname column dynamically
hostname_column_width=$((hostname_length + 10))

printf "+-----------------+-----------------+----------------------+-----------------------+\n"
printf "|   Service      |   IP Address    |   Port               |   Connection          |\n"
printf "+-----------------+-----------------+----------------------+-----------------------+\n"

check_connection $Cassandra $Cassandra_PORT_9042 "Cassandra" 
check_connection $Redis $Redis_PORT_6379 "Redis" 
check_connection $ES $ES_PORT_9200 "Elastic Search"
check_connection $Rabbit $Rabbit_PORT_5671 "Rabbit MQ"

printf "+-----------------+-----------------+----------------------+-----------------------+\n"














# RED='\033[0;31m'
# GREEN='\033[0;32m'
# NC='\033[0m'

# if [[ $(uname) == "Darwin" ]]; then
#     host_IP=$(ipconfig getifaddr en0) # Change en0 to your relevant interface
# else
#     host_IP=$(hostname -I | cut -d' ' -f1)
# fi

# host=$(hostname)



# Cassandra="172.27.89.125"
# Redis="172.27.88.205"
# TraininUI="172.22.19.189"
# ES="172.22.19.240"
# Rabbit="172.22.19.221"

# SSH_PORT_22=22
# Cassandra_PORT_9042=9042
# ES_PORT_9200=9200
# Redis_PORT_6379=6379
# Rabbit_PORT_5671=5671

# PORT_3000=3000
# PORT_3001=3001
# PORT_80=80
# PORT_8080=8080
# PORT_443=443



# check_connection() {
#     if (echo >/dev/tcp/$1/$2) &>/dev/null; then
#         printf "| %-15s | %-15s | %-20s | %-300s         |\n" "$3" "$1" "$2" "Connection successful from ($host_IP, $host)"
#     else
#         printf "| %-15s | %-15s | %-20s | %-30s |\n" "$3" "$1" "$2" "Connection failed from ($host_IP), ($host)"
#     fi
# }

# # printf "+-----------------+-----------------+----------------------+------------------------------------------------------------------------------+\n"
# printf "|   Service       |   IP Address    |   Port               |   Status                                                                     |\n"
# # printf "+-----------------+-----------------+----------------------+------------------------------------------------------------------------------+\n"

# check_connection $Cassandra $Cassandra_PORT_9042 "Cassandra"
# check_connection $Redis $Redis_PORT_6379 "Redis"
# check_connection $ES $ES_PORT_9200 "Elastic Search"
# check_connection $Rabbit $Rabbit_PORT_5671 "Rabbit MQ"

# # printf "+-----------------+-----------------+----------------------+------------------------------------------------------------------------------+\n"
