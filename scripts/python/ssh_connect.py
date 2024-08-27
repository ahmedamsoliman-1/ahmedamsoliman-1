import pexpect
import argparse
import os
from __cred import *
from utils import StreamLogger

stream_logger = StreamLogger()

def ssh_stay_connected(alias, password):
    stream_logger.stream_logger.system(f'Connecting to {alias} ...')
    try:
        # Spawn an SSH process
        ssh_newkey = 'Are you sure you want to continue connecting'
        child = pexpect.spawn(f'ssh {alias}')
        
        # Handle the various possible outcomes
        i = child.expect([ssh_newkey, 'password:', pexpect.EOF, pexpect.TIMEOUT])

        if i == 0:
            # Accept the SSH key
            child.sendline('yes')
            i = child.expect([ssh_newkey, 'password:', pexpect.EOF, pexpect.TIMEOUT])
        
        if i == 1:
            # Send the password
            child.sendline(password)
            child.expect(['$', '#'])  # Expect the shell prompt ($ for normal user, # for root)

        if i == 2:
            stream_logger.stream_logger.warning("EOF encountered")
        
        if i == 3:
            stream_logger.stream_logger.warning("Connection timed out")

        # Interact with the shell
        child.interact()

    except Exception as e:
        stream_logger.stream_logger.error(f"Error: {e}")

def ssh_execute_command(alias, password, command):
    try:
        stream_logger.stream_logger.system(f'Executing command on {alias} ...')
        # Spawn an SSH process to execute a command
        ssh_newkey = 'Are you sure you want to continue connecting'
        child = pexpect.spawn(f'ssh {alias} "{command}"')
        
        # Handle the various possible outcomes
        i = child.expect([ssh_newkey, 'password:', pexpect.EOF, pexpect.TIMEOUT])

        if i == 0:
            # Accept the SSH key
            child.sendline('yes')
            i = child.expect([ssh_newkey, 'password:', pexpect.EOF, pexpect.TIMEOUT])
        
        if i == 1:
            # Send the password
            child.sendline(password)
            child.expect(pexpect.EOF)
        
        if i == 2:
            stream_logger.stream_logger.warning("EOF encountered")
        
        if i == 3:
            stream_logger.stream_logger.warning("Connection timed out")

        # Get the output
        output = child.before.decode()
        child.close()
        
        return output

    except Exception as e:
        return str(e)

def scp(alias, password, local_path, remote_path):
    try:
        # Check if local path exists
        if not os.path.exists(local_path):
            return f"Local path {local_path} does not exist."

        # Determine if local path is a file or directory
        if os.path.isdir(local_path):
            stream_logger.stream_logger.system(f'Copying DIRECTORY {local_path} to {alias} - {remote_path} ...')
            scp_command = f"scp -r {local_path} {alias}:{remote_path}"
        else:
            stream_logger.stream_logger.system(f'Copying FILE {local_path} to {alias} - {remote_path} ...')
            scp_command = f"scp {local_path} {alias}:{remote_path}"

        child = pexpect.spawn(scp_command)

        i = child.expect(['password:', pexpect.EOF, pexpect.TIMEOUT])

        if i == 0:
            child.sendline(password)
            child.expect(pexpect.EOF)

        if i == 1:
            print("EOF encountered")

        if i == 2:
            print("Connection timed out")

        output = child.before.decode()
        child.close()

        return output

    except Exception as e:
        return str(e)

def scp_with_excludes(alias, password, local_path, remote_path):
    try:
        # Ensure the local path exists
        if not os.path.exists(local_path):
            return f"Local path {local_path} does not exist."

        # Determine the tarball name based on the directory name
        base_name = os.path.basename(os.path.normpath(local_path))
        tarball_name = f"{base_name}.tar.gz"

        # Create a tarball while excluding specific directories
        exclude_dirs = ["--exclude='.git'", "--exclude='node_modules'"]
        exclude_str = " ".join(exclude_dirs)
        tar_command = f"tar czf {tarball_name} {exclude_str} -C {local_path} ."

        # Execute the tar command to create the archive
        os.system(tar_command)

        # Transfer the tarball using scp
        scp_command = f"scp {tarball_name} {alias}:{remote_path}"
        child = pexpect.spawn(scp_command)

        i = child.expect(['password:', pexpect.EOF, pexpect.TIMEOUT])

        if i == 0:
            child.sendline(password)
            child.expect(pexpect.EOF)

        if i == 1:
            print("EOF encountered")

        if i == 2:
            print("Connection timed out")

        output = child.before.decode()
        child.close()

        # Clean up the tarball after transfer
        os.remove(tarball_name)

        return output

    except Exception as e:
        return str(e)


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(
        description='Connect to a specified DGX using SSH and stay connected interactively, execute a command, or copy files/directories using SCP.',
        epilog='Example 1: python your_script.py dgx-207\n'
               'Example 2: python your_script.py --command "ls -la" dgx-207\n'
               'Example 3: python your_script.py --scp /path/to/local/file_or_directory /remote/path dgx-207\n'
               'Example 4: python your_script.py --scp_exclude /path/to/local/directory /remote/path dgx-207'
    )
    parser.add_argument('alias', type=str, help='The DGX alias to connect to')
    parser.add_argument('--command', type=str, help='The command to execute on the DGX')
    parser.add_argument('--scp', nargs=2, metavar=('LOCAL_PATH', 'REMOTE_PATH'), help='Copy a local file or directory to the remote host')
    parser.add_argument('--scp_exclude', nargs=2, metavar=('LOCAL_PATH', 'REMOTE_PATH'), help='Copy a local directory to the remote host with exclusions')

    args = parser.parse_args()

    if args.command:
        # Execute the specified command
        output = ssh_execute_command(args.alias, password, args.command)
        print(output)
    elif args.scp:
        # Copy files/directories using normal SCP
        local_path, remote_path = args.scp
        output = scp(args.alias, password, local_path, remote_path)
        print(output)
    elif args.scp_exclude:
        # Copy directories using SCP with exclusions
        local_path, remote_path = args.scp_exclude
        output = scp_with_excludes(args.alias, password, local_path, remote_path)
        print(output)
    else:
        # Connect to the specified DGX and stay connected
        ssh_stay_connected(args.alias, password)

if __name__ == "__main__":
    main()


# python ssh_ececute_command.py --command "python3 aams/main.py overleaf" dgx-207

# local = /Users/ahmed.soliman/workspace/ahmed/aams-ahmedamsoliman-1/k8/tmp/paperless.json
# remote_path = /home/devops/services/overleaf/tmp

# ssh_stay_connected(alias, password)

# python3.11 ssh_connect.py --scp utils /home/devops/services/overleaf/tmp dgx-207
# python3.11 ssh_connect.py --scp requirements /home/devops/services/overleaf/tmp dgx-207
