#!/bin/bash

SCP=/Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/bash/bin/scp
TOML=/Users/ahmed.soliman/workspace/ahmed/kubernetes-yaml/config/tomls/updated


# $SCP/run_command.sh "mkdir -p /tmp/scp" 207
# $SCP/run_command.sh "mkdir -p /tmp/scp" 86
# $SCP/run_command.sh "mkdir -p /tmp/scp" 65
# $SCP/run_command.sh "mkdir -p /tmp/scp" 87
# $SCP/run_command.sh "mkdir -p /tmp/scp" 121
# $SCP/run_command.sh "mkdir -p /tmp/scp" 82
# $SCP/run_command.sh "mkdir -p /tmp/scp" 88
# $SCP/run_command.sh "mkdir -p /tmp/scp" 123


# $SCP/scp_file_dir.sh $TOML/dgx-master.toml "/tmp/scp" dgx-207
# $SCP/scp_file_dir.sh $TOML/dgx-node66.toml "/tmp/scp" dgx-86
# $SCP/scp_file_dir.sh $TOML/dgx-node45.toml "/tmp/scp" dgx-65
# $SCP/scp_file_dir.sh $TOML/dgx-node67.toml "/tmp/scp" dgx-87

# $SCP/scp_file_dir.sh $TOML/dgx2-node02.toml "/tmp/scp" dgx-121
# $SCP/scp_file_dir.sh $TOML/dgx-node62.toml "/tmp/scp" dgx-82
# $SCP/scp_file_dir.sh $TOML/dgx-node68.toml "/tmp/scp" dgx-88
# $SCP/scp_file_dir.sh $TOML/dgx2-node04.toml "/tmp/scp" dgx-123


# command2="sudo systemctl restart containerd"

# $SCP/run_command.sh "sudo cp /tmp/scp/dgx-master.toml /etc/containerd/config.toml && $command2" 207
# $SCP/run_command.sh "sudo cp /tmp/scp/dgx-node66.toml /etc/containerd/config.toml && $command2" 86
# $SCP/run_command.sh "sudo cp /tmp/scp/dgx-node45.toml /etc/containerd/config.toml && $command2" 65
# $SCP/run_command.sh "sudo cp /tmp/scp/dgx-node67.toml /etc/containerd/config.toml && $command2" 87
# $SCP/run_command.sh "sudo cp /tmp/scp/dgx2-node02.toml /etc/containerd/config.toml && $command2" 121
# $SCP/run_command.sh "sudo cp /tmp/scp/dgx-node62.toml /etc/containerd/config.toml && $command2" 82
# $SCP/run_command.sh "sudo cp /tmp/scp/dgx-node68.toml /etc/containerd/config.toml && $command2" 88
# $SCP/run_command.sh "sudo cp /tmp/scp/dgx2-node04.toml /etc/containerd/config.toml && $command2" 123


$SCP/run_command.sh "hostname" 207
$SCP/run_command.sh "hostname" 86
$SCP/run_command.sh "hostname" 65
$SCP/run_command.sh "hostname" 87
$SCP/run_command.sh "hostname" 121
$SCP/run_command.sh "hostname" 82
$SCP/run_command.sh "hostname" 88
$SCP/run_command.sh "hostname" 123
