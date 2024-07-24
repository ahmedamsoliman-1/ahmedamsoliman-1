#!/bin/bash

# docker build -t ahmedalimahmedalimsolimansd/avrcloud:latest .
# docker login
# docker push ahmedalimahmedalimsolimansd/avrcloud:latest




# push to local registry

docker tag ahmedalimahmedalimsolimansd/avrcloud:latest localhost:5000/ahmedalimahmedalimsolimansd/avrcloud:latest
docker push localhost:5000/ahmedalimahmedalimsolimansd/avrcloud:latest
