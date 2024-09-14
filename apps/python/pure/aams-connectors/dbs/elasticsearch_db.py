from elasticsearch import Elasticsearch, AsyncElasticsearch
from ssl import SSLContext, PROTOCOL_TLS_CLIENT, CERT_REQUIRED
from utils import Config, setup_logger

es_logger = setup_logger("database-es")


ssl_context = SSLContext(PROTOCOL_TLS_CLIENT)
ssl_context.verify_mode = CERT_REQUIRED
ssl_context.load_verify_locations(cafile=Config.ES_CERT_IO_BUNDLE)

timeout = 60

hosts = [Config.ES_HOST_1]
for host in [Config.ES_HOST_2, Config.ES_HOST_3, Config.ES_HOST_4, Config.ES_HOST_5]:
    if host:
        hosts.append(host)



class ElasticsearchDB():
    def __init__(self) -> None:
        es_logger.info(f"ElasticsearchDB initialized using {len(hosts)} Elastic seaerh hosts")
        for host in hosts:
            es_logger.info(host)
        es_logger.info(f"ElasticsearchDB initialized using user {Config.ES_USER}")
        es_logger.info(f"ElasticsearchDB certification located at {Config.ES_CERT_IO_BUNDLE}")

    def get_client(self):
        return Elasticsearch(
            hosts=hosts,
            http_auth=(Config.ES_USER, Config.ES_PASSWORD),
            ssl_context=ssl_context,
            request_timeout=timeout
        )
    
    def get_async_client(self):
        return AsyncElasticsearch(
            hosts=hosts,
            http_auth=(Config.ES_USER, Config.ES_PASSWORD),
            ssl_context=ssl_context,
            request_timeout=timeout
        )
    
    def db_info(self):
        es_logger.info(self.get_client().info())