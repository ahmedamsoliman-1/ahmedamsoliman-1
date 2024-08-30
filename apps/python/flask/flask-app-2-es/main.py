from flask import Flask
from elasticsearch import Elasticsearch
from dotenv import load_dotenv
import os
import ssl

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get Elasticsearch credentials and certificate from environment variables
es_host = os.environ.get("ES_HOST")
es_username = os.environ.get('ES_USERNAME')
es_password = os.environ.get('ES_PASSWORD')
es_cert = os.environ.get('ES_CERT')

# Ensure these environment variables are set
if not all([es_host, es_username, es_password, es_cert]):
    raise ValueError("Some environment variables are missing.")

# Set up SSL context
context = ssl.create_default_context(cafile=es_cert)

# Configure Elasticsearch client
es = Elasticsearch(
    hosts=[{
        'host': es_host,
        'port': 9200,
        'scheme': 'https'
    }],
    http_auth=(es_username, es_password),
    ssl_context=context,
    verify_certs=True
)

@app.route('/')
def index():
    # Example query to Elasticsearch
    try:
        es_info = es.info()
        return f"Connected to Elasticsearch: {es_info}"
    except Exception as e:
        return f"Error connecting to Elasticsearch: {str(e)}", 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
