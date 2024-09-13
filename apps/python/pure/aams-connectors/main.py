from dbs import AstraDB, CassandraDB, MongoDB, PostgresDB



astra_client = AstraDB()

# List all collections
collections = astra_client.list_collections()

# Example document to create
sample_document = {
    "name": "John Doe",
    "email": "john@example.com"
}
namespace_name = "aams_namespace_1"
astra_client.use_namespace(namespace_name)
collection_name = "aams_collection_1_users"
astra_client.create_collection(collection_name)
astra_client.create_document(collection_name, sample_document)

astra_client.get_document(collection_name, '76e55ce6-2598-4b69-a55c-e62598ab6981')
astra_client.gat_all_documents(collection_name)
astra_client.update_document(collection_name, '056bb2bf-375b-45d9-abb2-bf375b55d9c0', {"name": "John Doe Updated", "email": "update@google.com"})
astra_client.delete_document(collection_name, '056bb2bf-375b-45d9-abb2-bf375b55d9c0')
astra_client.delete_collection(collection_name)





cassandra_client = CassandraDB()
cassandra_client.create_keyspace('temp_1')
cassandra_client.create_table('temp_1', 'id UUID PRIMARY KEY, name TEXT')




mongo_client = MongoDB()
dbs = mongo_client.list_databases()
mongo_client.use_database('yelp')
mongo_client.list_collections()



postgres_client = PostgresDB()
postgres_client.connect()

tables = postgres_client.list_tables()