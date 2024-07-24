#!/bin/bash

RED='\033[0;31m' # ANSI color code for red
GREEN='\033[0;32m' # ANSI color code for green
NC='\033[0m' # ANSI color code to reset text color



engine_1="172.27.89.16"
engine_2="172.27.88.241"
engine_3="172.27.89.94"

backend_1="172.27.89.100"
backend_2="172.27.89.29"
backend_3="172.27.88.231"

frontend_1="172.27.89.120"
frontend_2="172.27.89.32"
frontend_3="172.27.88.209"

PORT_80=80




if [[ $(uname) == "Darwin" ]]; then
    host_IP=$(ipconfig getifaddr en0) # 
else
    host_IP=$(hostname -I | cut -d' ' -f1)
fi

host=$(hostname)


echo "UbuntuPC: $UbuntuPC"
echo "MacBook: $MacBook"

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

printf "+-----------------+-----------------+----------------------+-----------------------+\n"



# CS2-Platform-NLB-Engine-1       - 172.27.89.16    | 80
# CS2-Platform-NLB-Engine-2       - 172.27.88.241   | 80
# CS2-Platform-NLB-Engine-3       - 172.27.89.94    | 80
# CS2-Platform-NLB-Backend-1      - 172.27.89.100   | 80
# CS2-Platform-NLB-Backend-2      - 172.27.89.29    | 80
# CS2-Platform-NLB-Backend-3      - 172.27.88.231   | 80
# CS2-Platform-NLB-Frontend-1     - 172.27.89.120   | 80
# CS2-Platform-NLB-Frontend-2     - 172.27.89.32    | 80
# CS2-Platform-NLB-Frontend-3     - 172.27.88.209   | 80