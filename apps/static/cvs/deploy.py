import subprocess
import os

sub_modules = [
    'resume-data-eng-pdf',
    'resume-dev-pdf',
    'resume-dev-web',
    'resume-devops-pdf',
    'resume-ts-pdf',
]
def update_git():
    subprocess.run(['./copy.sh'])
    # Get the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))

    for module in sub_modules:
        subprocess.run([f'pwd'])
        # Construct the path to the module's directory
        module_dir = os.path.join(current_dir, module)
        
        # Change directory to the module's directory
        os.chdir(module_dir)
        
        # Run the update_git.sh script
        subprocess.run(['./update_git.sh'])

    # Change back to the original directory
    os.chdir(current_dir)
    subprocess.run(['./update-git.sh'])


def main():
    update_git()

if __name__ == '__main__':
    main()

