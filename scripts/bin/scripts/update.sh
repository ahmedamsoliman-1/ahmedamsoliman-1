#!/bin/bash

message="AC-701"

git status
git add .

branch=$(git symbolic-ref --short HEAD)
echo $branch

git commit -m $message
git push origin $branch

git checkout develop-beta

git checkout develop -- .

git add .

git commit -m $message
git push origin $branch

git checkout develop