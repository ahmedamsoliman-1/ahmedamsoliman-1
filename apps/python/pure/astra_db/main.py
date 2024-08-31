from db import AstraDB
from utils import setup_logger
logger = setup_logger("main_script")

def main():
    # Initialize the AstraDB instance
    db_client = AstraDB()
    
    # List all collections
    collections = db_client.list_collections()
    logger.info(f"Collections: {collections}")
    
    # Example document to create
    sample_document = {
        "name": "John Doe",
        "email": "john@example.com"
    }

    namespace_name = "aams_namespace_1"
    db_client.use_namespace(namespace_name)

    collection_name = "aams_collection_1_users"
    db_client.create_collection(collection_name)
    db_client.create_document(collection_name, sample_document)
    
    db_client.get_document(collection_name, '76e55ce6-2598-4b69-a55c-e62598ab6981')
    db_client.gat_all_documents(collection_name)

    db_client.update_document(collection_name, '056bb2bf-375b-45d9-abb2-bf375b55d9c0', {"name": "John Doe Updated", "email": "update@google.com"})

    db_client.delete_document(collection_name, '056bb2bf-375b-45d9-abb2-bf375b55d9c0')
    db_client.delete_collection(collection_name)

    logger.info("Script execution completed successfully.")

if __name__ == "__main__":
    main()
