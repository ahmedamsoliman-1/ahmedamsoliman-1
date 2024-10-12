from dbs import AstraDB, CassandraDB, MongoDB, PostgresDB, ElasticsearchDB, ElasticCloudDB
from utils import setup_logger

logger = setup_logger('info')




# logger.debug("escloudDB")
# escloud_client = ElasticCloudDB()
# escloud_client.db_info()




# logger.debug("ElasticsearchDB")
# es_client = ElasticsearchDB()
# es_client.db_info()




# logger.debug("AstraDB")
# astra_client = AstraDB()
# astra_client.db_info()



# logger.debug("CassandraDB")
# cassandra_client = CassandraDB()
# cassandra_client.db_info()




# logger.debug("MongoDB")
# mongo_client = MongoDB()
# mongo_client.db_info()




# logger.debug("PostgresDB")
# postgres_client = PostgresDB()
# postgres_client.db_info()


from ETLs import CSVToESETL
es_db = ElasticsearchDB()


csv_file = '/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/python/pure/aams/ETLs/input/play_tester_prod_data.csv'
csv_file = '/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/python/pure/aams/ETLs/input/play_tester_stage_data.csv'
csv_file = '/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps/python/pure/aams/ETLs/input/play_tester_qa_data.csv'

index = 'play_tester_1st_july_to_5th_sep_2024'

etl = CSVToESETL(es_db=es_db, es_index=index)
etl.run_etl(csv_file)
print("Hi")