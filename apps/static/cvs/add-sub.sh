#!/bin/bash

SUB="git@github.com:ahmedamsoliman-1/resume-dev-web.git"

git submodule add $SUB

git submodule update --init --recursive




sleep 4s    