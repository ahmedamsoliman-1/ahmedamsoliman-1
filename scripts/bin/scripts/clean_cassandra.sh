#!/bin/bash

# Login to cqlsh
# cqlsh -u <username> -p <password> -e ""
cqlsh 172.27.89.125 9042

# Get list of existing keyspaces
keyspaces=$(echo "DESCRIBE KEYSPACES;" | cqlsh 172.27.89.125 9042 | awk '{if (NR>2) print $1}')

# Loop through keyspaces and get tables
for keyspace in $keyspaces
do
    tables=$(echo "USE $keyspace; DESCRIBE TABLES;" | cqlsh 172.27.89.125 9042 | awk '{if (NR>2) print $1}')
    for table in $tables
    do
        echo "Dropping table $keyspace.$table"
        echo "DROP TABLE IF EXISTS $keyspace.$table;" | cqlsh 172.27.89.125 9042
    done
    echo "Dropping keyspace $keyspace"
    echo "DROP KEYSPACE IF EXISTS $keyspace;" | cqlsh 172.27.89.125 9042
done
