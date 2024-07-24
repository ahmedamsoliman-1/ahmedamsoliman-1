import docker
import os

# Initialize the Docker client
client = docker.from_env()

# Define variables
dockerfile_path = './Dockerfile'  # Path to your Dockerfile
image_name = 'avrcloudx'           # Name of the image
tag = '1'                    # Tag for the image
registry_url = '10.10.25.207:5000'

# Full image name with registry URL
full_image_name = f"{registry_url}/{image_name}:{tag}"

# Build the Docker image
print("Building the Docker image...")
image, build_logs = client.images.build(path=os.path.dirname(dockerfile_path), tag=full_image_name)

# Print build logs
for log in build_logs:
    print(log.get('stream', '').strip())

# Push the Docker image to the local registry
print(f"Pushing the image to {registry_url}...")
push_logs = client.images.push(full_image_name, stream=True, decode=True)

# Print push logs
for log in push_logs:
    print(log.get('status', ''))

print(f"Image {full_image_name} pushed successfully.")
