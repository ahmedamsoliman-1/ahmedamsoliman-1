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
        es_logger.info(f"ElasticsearchDB initialized using {len(hosts)} Elasticsearch hosts")
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
        client = self.get_client()

        # Get cluster health
        cluster_health = client.cluster.health()
        es_logger.info(f"Cluster Health: {cluster_health['status']}")
        es_logger.info(f"Number of Nodes: {cluster_health['number_of_nodes']}")
        es_logger.info(f"Active Primary Shards: {cluster_health['active_primary_shards']}")
        es_logger.info(f"Active Shards: {cluster_health['active_shards']}")

        # Get number of nodes and their roles
        nodes_info = client.nodes.info()
        node_count = len(nodes_info['nodes'])
        es_logger.info(f"Total Number of Nodes: {node_count}")

        # Count nodes by roles (e.g., data nodes, master nodes, ingest nodes)
        data_nodes = 0
        master_nodes = 0
        ingest_nodes = 0
        for node_id, node_info in nodes_info['nodes'].items():
            roles = node_info.get('roles', [])
            if 'data' in roles:
                data_nodes += 1
            if 'master' in roles:
                master_nodes += 1
            if 'ingest' in roles:
                ingest_nodes += 1

        es_logger.info(f"Data Nodes: {data_nodes}")
        es_logger.info(f"Master Nodes: {master_nodes}")
        es_logger.info(f"Ingest Nodes: {ingest_nodes}")

        # Get index information (just the count of indices)
        indices_info = client.cat.indices(format="json")
        indices_count = len(indices_info)
        es_logger.info(f"Total Number of Indices: {indices_count}")

        # Calculate the total document count, handle possible None values
        total_docs = 0
        for index in indices_info:
            doc_count = index.get('docs.count')
            if doc_count and doc_count.isdigit():
                total_docs += int(doc_count)
        es_logger.info(f"Total Number of Documents: {total_docs}")

        return {
            "cluster_status": cluster_health['status'],
            "number_of_nodes": node_count,
            "data_nodes": data_nodes,
            "master_nodes": master_nodes,
            "ingest_nodes": ingest_nodes,
            "active_primary_shards": cluster_health['active_primary_shards'],
            "active_shards": cluster_health['active_shards'],
            "indices_count": indices_count,
            "total_documents": total_docs
        }
    
    def db_info_detailed(self):
        client = self.get_client()

        # Get basic cluster info
        cluster_health = client.cluster.health()
        es_logger.info(f"Cluster Health: {cluster_health}")

        # Get node information
        nodes_info = client.nodes.info()
        es_logger.info(f"Nodes Info: {nodes_info}")

        # Get node stats
        node_stats = client.nodes.stats()
        es_logger.info(f"Node Stats: {node_stats}")

        # Get indices information
        indices_info = client.cat.indices(format="json")
        # es_logger.info(f"Indices Info: {indices_info}")

        # Get cluster settings (optional)
        cluster_settings = client.cluster.get_settings()
        es_logger.info(f"Cluster Settings: {cluster_settings}")
        
        return {
            "cluster_health": cluster_health,
            "nodes_info": nodes_info,
            "node_stats": node_stats,
            "indices_info": indices_info,
            "cluster_settings": cluster_settings
        }
