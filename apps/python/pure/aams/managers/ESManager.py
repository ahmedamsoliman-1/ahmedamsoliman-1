from elasticsearch import exceptions
from dbs import ElasticsearchDB
from utils import setup_logger

es_manager_logger = setup_logger('es-manager')

class ESIndexManager:
    def __init__(self, es_connector):
        """
        Initialize the ESIndexManager with an ESConnector instance.
        """
        self.es_client = es_connector.get_client()

    def create_index(self, index_name, mapping):
        """
        Create a new index with the specified mapping.
        """
        if not self.es_client.indices.exists(index=index_name):
            self.es_client.indices.create(index=index_name, body=mapping)
            es_manager_logger.info(f"Created new index: {index_name}")
        else:
            es_manager_logger.info(f"Index {index_name} already exists.")

    def reindex_data(self, old_index, new_index):
        """
        Reindex data from the old index to the new index.
        """
        reindex_body = {
            "source": {"index": old_index},
            "dest": {"index": new_index}
        }
        response = self.es_client.reindex(body=reindex_body, wait_for_completion=True)
        es_manager_logger.info(f"Reindex response: {response}")

    def update_aliases(self, alias_name, old_index, new_index):
        """
        Update alias to point to the new index.
        """
        actions = [
            {"remove": {"index": old_index, "alias": alias_name}},
            {"add": {"index": new_index, "alias": alias_name}}
        ]
        self.es_client.indices.update_aliases(body={"actions": actions})
        es_manager_logger.info(f"Updated alias {alias_name} to point to {new_index}")

    def delete_index(self, index_name):
        """
        Delete an index.
        """
        if self.es_client.indices.exists(index=index_name):
            self.es_client.indices.delete(index=index_name)
            es_manager_logger.info(f"Deleted index: {index_name}")
        else:
            es_manager_logger.info(f"Index {index_name} does not exist.")
    
    def get_index_info(self, index_name):
        """
        Get index settings and mappings for a given index.
        """
        return self.es_client.indices.get(index=index_name)
    
    def index_exists(self, index_name):
        """
        Check if an index exists in Elasticsearch.
        """
        return self.es_client.indices.exists(index=index_name)
    
    def put_settings(self, index_name, settings):
        """
        Update settings for an existing index.
        """
        self.es_client.indices.close(index=index_name)
        self.es_client.indices.put_settings(index=index_name, body=settings)


class ElasticSearchManager:
    def __init__(self):
        """
        Initialize the main manager that will control the flow of operations.
        """
        # Assuming ElasticsearchDB handles low-level ES connections and operations
        self.es_connector = ElasticsearchDB()
        self.index_manager = ESIndexManager(self.es_connector)

    def modify_index(self, old_index, new_index, new_mapping, alias_name=None):
        """
        Modify the index by creating a new index, reindexing data, and optionally updating aliases.
        """
        # Step 1: Create the new index with the updated mapping
        self.index_manager.create_index(new_index, new_mapping)

        # Step 2: Reindex the data from the old index to the new index
        self.index_manager.reindex_data(old_index, new_index)

        # Step 3: (Optional) Update the alias to point to the new index
        if alias_name:
            self.index_manager.update_aliases(alias_name, old_index, new_index)

        # Step 4: (Optional) Delete the old index if needed
        # self.index_manager.delete_index(old_index)

    def copy_index(self, source_index, target_index):
        """
        Copy an existing index with all its data, settings, and mappings into a new index.
        """
        # Step 1: Get the mappings of the source index
        index_info = self.index_manager.get_index_info(source_index)
        mappings = index_info[source_index]['mappings']
        settings = index_info[source_index]['settings']

        # Step 2: Create the new index with default settings and existing mappings
        new_index_body = {
            "mappings": mappings
        }

        if not self.index_manager.index_exists(target_index):
            self.index_manager.create_index(target_index, new_index_body)  # No settings included
            es_manager_logger.info(f"Created index '{target_index}' successfully.")
        else:
            es_manager_logger.info(f"Index '{target_index}' already exists.")

        # Step 3: Reindex data from source_index to target_index
        self.index_manager.reindex_data(source_index, target_index)
        es_manager_logger.info(f"Reindexing from '{source_index}' to '{target_index}' completed.")
    
    def set_index_settings(self, index_name, new_settings):
        """
        Update the settings of an existing index.
        """
        if self.index_manager.index_exists(index_name):
            try:
                # Retrieve existing settings (if you need them)
                existing_settings = self.index_manager.get_index_info(index_name)[index_name]['settings']
                es_manager_logger.info(f"Existing settings for index '{index_name}': {existing_settings}")

                # Ensure new_settings is structured correctly (flattened)
                flat_settings = {}
                for key, value in new_settings['index'].items():
                    flat_settings[key] = value

                # Update the index settings
                self.index_manager.put_settings(index_name, flat_settings)

                es_manager_logger.info(f"Updated settings for index '{index_name}'.")

                updated_settings = self.index_manager.get_index_info(index_name)[index_name]['settings']
                es_manager_logger.info(f"Existing settings for index '{index_name}': {updated_settings}")

            except exceptions.NotFoundError:
                es_manager_logger.error(f"Index '{index_name}' not found.")
            except exceptions.ElasticsearchException as e:
                es_manager_logger.error(f"Error updating settings for index '{index_name}': {e}")
        else:
            es_manager_logger.info(f"Index '{index_name}' does not exist.")
