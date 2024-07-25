#!/bin/bash

# Wait for MongoDB to start
sleep 10

# Initialize the replica set
mongo --eval 'rs.initiate()'

# Check the replica set status and wait for a primary
until mongo --eval 'rs.isMaster().ismaster'; do
  echo "Waiting for MongoDB replica set primary..."
  sleep 5
done

echo "MongoDB replica set initialized and primary is elected."
