#!/bin/bash


localDirUI="/Users/ahmed.soliman/workspace/ahmed/cs2-platform-datapipline"
compress_project_Data="compress_project_Data.tar.gz"
remoteHostUI="172.27.89.121"
remoteUser="ahmed.soliman@devops@10.10.25.181"
remoteDir="/app/tmp"

cd "$localDirUI" || exit
tar -czf $compress_project_Data --exclude=node_modules .
scp $compress_project_Data "$remoteUser@$remoteHostUI:$remoteDir"
rm $compress_project_Data



