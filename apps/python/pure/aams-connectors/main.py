from dbs import AstraDB, CassandraDB, MongoDB, PostgresDB, ElasticsearchDB
from utils import setup_logger

logger = setup_logger('info')



logger.debug("ElasticsearchDB")
es_client = ElasticsearchDB()
es_client.db_info()




logger.debug("AstraDB")
astra_client = AstraDB()
astra_client.db_info()



logger.debug("CassandraDB")
cassandra_client = CassandraDB()
cassandra_client.db_info()




logger.debug("MongoDB")
mongo_client = MongoDB()
mongo_client.db_info()




logger.debug("PostgresDB")
postgres_client = PostgresDB()
postgres_client.db_info()

