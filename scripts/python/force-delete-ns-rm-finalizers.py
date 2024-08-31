import subprocess
import json
import sys
import logging

def get_namespace_status(namespace):
    try:
        result = subprocess.run(
            ["kubectl", "get", "namespace", namespace, "-o", "json"],
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error getting namespace status: {e.stderr}")
        return None

def remove_finalizers(namespace):
    # Fetch the namespace JSON object
    namespace_data = get_namespace_status(namespace)
    
    if not namespace_data:
        return False
    
    # Check if the namespace is in terminating state
    if namespace_data['status'].get('phase') != 'Terminating':
        print(f"Namespace '{namespace}' is not in 'Terminating' state. No action taken.")
        return False
    
    # Remove the finalizers
    if 'finalizers' in namespace_data['spec']:
        print(f"Removing finalizers from namespace '{namespace}'...")
        namespace_data['spec']['finalizers'] = []
        
        # Save the modified JSON to a file
        with open(f"{namespace}.json", "w") as f:
            json.dump(namespace_data, f)
        
        # Apply the changes using kubectl
        try:
            subprocess.run(
                ["kubectl", "replace", "--raw", f"/api/v1/namespaces/{namespace}/finalize", "-f", f"./{namespace}.json"],
                check=True
            )
            print(f"Finalizers removed successfully from namespace '{namespace}'.")
            return True
        except subprocess.CalledProcessError as e:
            print(f"Error removing finalizers: {e.stderr}")
            return False
    else:
        print(f"No finalizers found for namespace '{namespace}'. No action taken.")
        return False

def main(namespace):
    namespace_data = get_namespace_status(namespace)
    
    if namespace_data is None:
        print(f"Namespace '{namespace}' not found.")
        return

    # Ensure that the namespace is not active (non-terminating)
    if namespace_data['status'].get('phase') != 'Terminating':
        print(f"Namespace '{namespace}' is currently active. Skipping deletion of finalizers.")
        return

    # Attempt to remove finalizers
    success = remove_finalizers(namespace)
    
    if success:
        print(f"Successfully processed namespace '{namespace}'.")
    else:
        print(f"Failed to process namespace '{namespace}'.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python remove_namespace_finalizer.py <namespace>")
    else:
        namespace = sys.argv[1]
        main(namespace)
