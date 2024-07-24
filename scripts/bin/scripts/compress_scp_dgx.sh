#!/bin/bash


localDirUI="/home/ahmed.soliman@Avrcorp.net/cs2/ac0"
compress_project_Data="/home/ahmed.soliman@Avrcorp.net/cs2/ac0.tar.gz"
dgx="dgx-86"
remoteDir="/home/devops/AC0_load_test"

cd "$localDirUI" || exit
tar -czf $compress_project_Data --exclude=.git .
scp $compress_project_Data $dgx:$remoteDir
rm $compress_project_Data



