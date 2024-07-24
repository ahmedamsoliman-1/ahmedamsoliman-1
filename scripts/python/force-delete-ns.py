import os
import json
import requests
from json.decoder import JSONDecodeError
import sys
from utils import StreamLogger


stream_logger = StreamLogger()


def check_namespace_phase(namespace):
    # Fetch namespace details in JSON format
    os.system(f"kubectl get ns {namespace} -o json > {namespace}.json")
    
    # Read JSON file
    try:
        with open(f"{namespace}.json", "r") as file:
            namespace_data = json.load(file)
    except JSONDecodeError:
        return False, f"Namespace {namespace} not found."
    
    # Check if the namespace exists
    if 'status' not in namespace_data:
        return False, f"Namespace {namespace} not found."
    
    # Check if the namespace is in the termination phase
    phase = namespace_data['status'].get('phase')
    if phase == "Terminating":
        return True, None
    else:
        return False, stream_logger.stream_logger.warning(f"Namespace {namespace} is not in the termination phase.")

def force_delete_stuck_namespace(namespace):
    # Check if namespace exists and is in termination phase
    # os.system('kubectl get ns')
    exists, phase_msg = check_namespace_phase(namespace)
    if not exists:
        stream_logger.stream_logger.warning(phase_msg)
        return
    
    # Ensure the tmp directory exists
    os.makedirs('tmp', exist_ok=True)
    
    # Fetch namespace details in JSON format
    dir_file = f'tmp/{namespace}.json'
    os.system(f"kubectl get ns {namespace} -o json > {dir_file}")
    
    # Read JSON file
    with open(dir_file, "r") as file:
        namespace_data = json.load(file)
    
    # Remove the 'spec' field
    if 'spec' in namespace_data:
        del namespace_data['spec']
    
    # Write updated JSON back to file
    with open(dir_file, "w") as file:
        json.dump(namespace_data, file)
    
    # Send PUT request to finalize deletion
    url = f"http://127.0.0.1:8001/api/v1/namespaces/{namespace}/finalize"
    headers = {"Content-Type": "application/json"}
    with open(dir_file, "rb") as file:
        response = requests.put(url, headers=headers, data=file) 
    
    if response.status_code == 200:
        stream_logger.stream_logger.system(f"Namespace {namespace} deleted successfully.")
        os.system(f"kubectl get ns")
    else:
        stream_logger.stream_logger.error(f"Failed to delete namespace {namespace}. Status code: {response.status_code}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        stream_logger.stream_logger.warning("Usage: python script.py <namespace>")
        sys.exit(1)

    namespace = sys.argv[1]
    force_delete_stuck_namespace(namespace)
