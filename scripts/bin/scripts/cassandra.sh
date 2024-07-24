#!/bin/bash




usage() {
    echo "Usage: $0 <instance_name>"
    echo "Example: $0 alpha/beta/localhost"
    exit 1
}




if [ $# -ne 1 ]; then
    usage
fi

case "$1" in
    beta)
        HOST="172.27.88.248"
        ;;
    alpha)
        HOST="172.27.89.125"
        ;;
    localhost)
        HOST="localhost"
        ;;
    *)
        echo "Unknown cassandra instance name: $1"
        usage
        ;;
esac




cqlsh $HOST 
# select count(*) from cs2_keyspace_5.cs2_games where player_white = 2b435cf4-6eb7-5d64-bdce-1c047fdb2033 and player_black = 2b435cf4-6eb7-5d64-bdce-1c047fdb2033 and game_status = 'Inprogress' allow filtering;
# select count(*) from cs2_keyspace_5.cs2_game_termination;
