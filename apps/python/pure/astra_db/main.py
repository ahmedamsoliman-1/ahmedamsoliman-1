from db import AstraDB

def main():
    # Initialize the AstraDB instance
    db_client = AstraDB()
    
    # List all collections
    collections = db_client.list_collections()
    print(f"Collections: {collections}")
    
    # Example document to create
    sample_document = {
        "name": "John Doe",
        "email": "john@example.com"
    }
    
    # Create a document in a collection named 'users'
    doc_id = db_client.create_document("users", sample_document)
    print(f"Document created with ID: {doc_id}")
    
    # # Fetch the created document
    # retrieved_doc = db_client.get_document("users", doc_id)
    # print(f"Retrieved Document: {retrieved_doc}")
    
    # Close the connection
    db_client.close_connection()

if __name__ == "__main__":
    main()
