#!/bin/bash

VERSION=44


# docker build -t ahmedalimsolimansd/portfolio:$VERSION .

# # docker run -p 8082:8080 ahmedalimsolimansd/portfolio:3
# docker buildx build --platform linux/amd64 -t ahmedalimsolimansd/portfolio:$VERSION .


# docker push ahmedalimsolimansd/portfolio:$VERSION



# docker build -t ahmedalimsolimansd/portfolio:3 .
# docker push ahmedalimsolimansd/portfolio:3

# docker buildx build --platform linux/amd64 -t ahmedalimsolimansd/portfolio:4 .
# docker push ahmedalimsolimansd/portfolio:4


docker build -t ahmedalimsolimansd/portfolio:$VERSION .
docker push ahmedalimsolimansd/portfolio:$VERSION