from elasticsearch import Elasticsearch, AsyncElasticsearch
from utils import Config, setup_logger

es_logger = setup_logger("database-es")

# Cloud ID and credentials for your Elastic Cloud deployment
cloud_id = Config.ESCLOUD_CLOUD_ID
username = Config.ESCLOUD_USERNAME
password = Config.ESCLOUD_PASSWORD

# Timeout configuration
timeout = 60

class ElasticCloudDB():
    def __init__(self) -> None:
        es_logger.info(f"ElasticsearchDB initialized for Elastic Cloud")
        es_logger.info(f"Username: {cloud_id}")
        es_logger.info(f"Username: {username}")
        es_logger.info(f"Password: {password}")

    def get_client(self):
        return Elasticsearch(
            cloud_id=cloud_id,
            basic_auth=(username, password),
            timeout=timeout
        )

    def db_info(self):
        es_logger.info(self.get_client().info())

