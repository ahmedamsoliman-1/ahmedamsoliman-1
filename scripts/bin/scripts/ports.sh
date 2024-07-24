#!/bin/bash

start_port=1       # Specify the start of the port range
end_port=800      # Specify the end of the port range

echo "Current active ports"
services=$(netstat -tuln | awk -v start=$start_port -v end=$end_port 'NR > 2 && $4 ~ ":" {split($4, port, ":"); if (port[2] >= start && port[2] <= end) print $4}' | awk -F ":" '{print $2}' | sort -n | uniq)

for port in $services
do
    service_name=$(grep -w "$port/tcp" /etc/services | awk '{print $1}')
    echo "Port $port : $service_name"
done


echo "
"

start_port=3000       # Specify the start of the port range
end_port=3015    # Specify the end of the port range

services=$(netstat -tuln | awk -v start=$start_port -v end=$end_port 'NR > 2 && $4 ~ ":" {split($4, port, ":"); if (port[2] >= start && port[2] <= end) print $4}' | awk -F ":" '{print $2}' | sort -n | uniq)

for port in $services
do
    service_name=$(grep -w "$port/tcp" /etc/services | awk '{print $1}')
    echo "Port $port : $service_name"
done


echo "
"

start_port=3016       # Specify the start of the port range
end_port=9999    # Specify the end of the port range

services=$(netstat -tuln | awk -v start=$start_port -v end=$end_port 'NR > 2 && $4 ~ ":" {split($4, port, ":"); if (port[2] >= start && port[2] <= end) print $4}' | awk -F ":" '{print $2}' | sort -n | uniq)

for port in $services
do
    service_name=$(grep -w "$port/tcp" /etc/services | awk '{print $1}')
    echo "Port $port : $service_name"
done
