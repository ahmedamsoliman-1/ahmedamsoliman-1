#!/bin/bash

python3.11 /Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/python/ssh_connect.py --command 'sudo rm -r /tmp/scp/PortForward-ALB' dgx-207

python3.11 /Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/python/ssh_connect.py --scp PortForward-ALB /tmp/scp dgx-207
