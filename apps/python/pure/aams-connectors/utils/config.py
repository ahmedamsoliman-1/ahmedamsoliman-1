# config.py

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuration class for managing environment variables."""
    POSTGRES_DB_NAME = os.getenv('POSTGRES_DB_NAME')
    POSTGRES_DB_USER = os.getenv('POSTGRES_DB_USER')
    POSTGRES_DB_PASSWORD = os.getenv('POSTGRES_DB_PASSWORD')
    POSTGRES_DB_HOST = os.getenv('POSTGRES_DB_HOST')
    POSTGRES_DB_PORT = int(os.getenv('POSTGRES_DB_PORT', 5432))

    ASTRA_DB_ENDPOINT = os.getenv('ASTRA_DB_ENDPOINT')
    ASTRA_DB_TOKEN = os.getenv('ASTRA_DB_TOKEN')

    MONGO_DB_URI = os.getenv('MONGO_DB_URI')

    CASSANDRA_CONTACT_POINTS = os.getenv('CASSANDRA_CONTACT_POINTS')
    CASSANDRA_KEYSPACE = os.getenv('CASSANDRA_KEYSPACE')
    CASSANDRA_USERNAME = os.getenv('CASSANDRA_USERNAME')
    CASSANDRA_PASSWORD = os.getenv('CASSANDRA_PASSWORD')
    ES_HOSTS = os.getenv('ES_HOSTS')
    ES_USE_SSL = os.getenv('ES_USE_SSL')
    ES_CERTIFICATE_BUNDLE = os.getenv('ES_CERTIFICATE_BUNDLE', '/path/to/certificate.pem')
    ES_USERNAME = os.getenv('ES_USERNAME')
    ES_PASSWORD = os.getenv('ES_PASSWORD')
