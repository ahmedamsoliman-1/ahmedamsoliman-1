#!/bin/bash

# Function to list all configurations
list_configs() {
    gcloud config configurations list
}

# Function to activate a configuration
activate_config() {
    local config_name=$1
    gcloud config configurations activate "$config_name"
    echo "Switched to configuration: $config_name"
}

# Function to show the current configuration
current_config() {
    gcloud config configurations list --filter="is_active:true" --format="value(name)"
}

# Function to delete a configuration
delete_config() {
    local config_name=$1
    gcloud config configurations delete "$config_name" -q
    echo "Deleted configuration: $config_name"
}

# Function to list GKE clusters
list_gke_clusters() {
    gcloud container clusters list
}

# Function to login to a GCP account
login_gcp() {
    gcloud auth login --no-launch-browser
}

# Function to create a new gcloud configuration
create_config() {
    local config_name=$1
    gcloud config configurations create "$config_name"
    echo "Created configuration: $config_name"
    echo "Please log in to the new configuration."
    gcloud auth login --no-launch-browser
    read -p "Enter project ID: " project_id
    gcloud config set project "$project_id"
    read -p "Enter region (optional): " region
    if [ ! -z "$region" ]; then
        gcloud config set compute/region "$region"
    fi
    read -p "Enter zone (optional): " zone
    if [ ! -z "$zone" ]; then
        gcloud config set compute/zone "$zone"
    fi
    echo "Configuration $config_name created and set up."
}

# Function to login to GCP using a service account key file
login_gcp_service_account() {
    local key_file=$1
    if [ ! -f "$key_file" ]; then
        echo "Service account key file not found: $key_file"
        exit 1
    fi
    gcloud auth activate-service-account --key-file="$key_file"
    echo "Logged in using service account key file: $key_file"
}

# Function to list GCE instances
list_gce_instances() {
    gcloud compute instances list
}

# Function to list Cloud Storage buckets
list_gcs_buckets() {
    gcloud storage buckets list
}

# Function to list BigQuery datasets
list_bq_datasets() {
    local project_id=$1
    if [ -z "$project_id" ]; then
        echo "Please provide the project ID."
        exit 1
    fi
    gcloud bigquery datasets list --project="$project_id"
}

# Function to get GKE cluster credentials and set kubectl context
get_gke_credentials() {
    local cluster_name=$1
    local zone=$2
    local project_id=$3
    if [ -z "$cluster_name" ] || [ -z "$zone" ] || [ -z "$project_id" ]; then
        echo "Please provide the cluster name, zone, and project ID."
        exit 1
    fi
    gcloud container clusters get-credentials "$cluster_name" --zone "$zone" --project "$project_id"
    echo "kubectl context set to use cluster: $cluster_name"
}

# Main script logic
case "$1" in
    list)
        list_configs
        ;;
    switch)
        if [ -z "$2" ]; then
            echo "Please provide the configuration name to switch to."
            exit 1
        fi
        activate_config "$2"
        ;;
    current)
        current_config
        ;;
    delete)
        if [ -z "$2" ]; then
            echo "Please provide the configuration name to delete."
            exit 1
        fi
        delete_config "$2"
        ;;
    gke)
        list_gke_clusters
        ;;
    login)
        login_gcp
        ;;
    login-service-account)
        if [ -z "$2" ]; then
            echo "Please provide the path to the service account key file."
            exit 1
        fi
        login_gcp_service_account "$2"
        ;;
    create)
        if [ -z "$2" ]; then
            echo "Please provide the name for the new configuration."
            exit 1
        fi
        create_config "$2"
        ;;
    gce)
        list_gce_instances
        ;;
    gcs)
        list_gcs_buckets
        ;;
    bq)
        if [ -z "$2" ]; then
            echo "Please provide the project ID."
            exit 1
        fi
        list_bq_datasets "$2"
        ;;
    get-credentials)
        if [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]; then
            echo "Usage: $0 get-credentials <cluster-name> <zone> <project-id>"
            exit 1
        fi
        get_gke_credentials "$2" "$3" "$4"
        ;;
    *)
        echo "Usage: $0 {list|switch <config-name>|current|delete <config-name>|gke|login|login-service-account <key-file>|create <config-name>|gce|gcs|bq <project-id>|get-credentials <cluster-name> <zone> <project-id>}"
        exit 1
        ;;
esac
