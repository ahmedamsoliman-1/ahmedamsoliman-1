#!/bin/bash

# Fetch IP address for www
www_ip=$(dig +short www.ahmedalimsoliman.com)

# Fetch IP address for api
api_ip=$(dig +short api.ahmedalimsoliman2.com)

# Output as JSON
echo "{\"www_ip\": \"$www_ip\", \"api_ip\": \"$api_ip\"}"
