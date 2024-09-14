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

    ES_HOST_1 = os.getenv('ES_HOST_1')
    ES_HOST_2 = os.getenv('ES_HOST_2')
    ES_HOST_3 = os.getenv('ES_HOST_3')
    ES_HOST_4 = os.getenv('ES_HOST_4')
    ES_HOST_5 = os.getenv('ES_HOST_5')
    ES_USER = os.getenv('ES_USER')
    ES_PASSWORD = os.getenv('ES_PASSWORD')
    ES_CERT_IO_BUNDLE = os.getenv('ES_CERT_IO_BUNDLE')
