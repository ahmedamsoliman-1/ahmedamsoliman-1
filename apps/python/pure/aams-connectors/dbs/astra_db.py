from astrapy import DataAPIClient
from typing import List, Dict, Any
from utils import setup_logger, Config


astra_logger = setup_logger("database-astra")

class AstraDB:
    def __init__(self):
        self.token = Config.ASTRA_DB_TOKEN
        self.endpoint = Config.ASTRA_DB_ENDPOINT

        astra_logger.info(f"Connecting to Astra DB: {self.endpoint}")

        # Initialize the DataAPIClient with the token from config
        self.client = DataAPIClient(self.token)
        self.db = self.client.get_database_by_api_endpoint(self.endpoint)
        astra_logger.warning(f"Connected to Astra DB: {self.db.list_collection_names()}")

    def use_namespace(self, namespace_name: str) -> None:
        """Set the current namespace."""
        self.db.use_namespace(namespace_name)
        astra_logger.info(f"Using namespace '{namespace_name}'.")
    
    def list_collections(self) -> List[str]:
        """List all collections in the database."""
        return self.db.list_collection_names()
    
    def create_collection(self, collection_name: str) -> None:
        """Create a new collection if not exists."""
        if collection_name not in self.list_collections():
            self.db.create_collection(collection_name)
        else:
            astra_logger.info(f"Collection '{collection_name}' already exists.")

    def create_document(self, collection_name: str, document: Dict[str, Any]) -> str:
        """Create a new document in the specified collection."""
        collection = self.db.get_collection(collection_name)
        # Use the correct method for inserting a document
        result = collection.insert_one(document)
        astra_logger.info(f"Document created with ID: {result.inserted_id}")
        return str(result.inserted_id)
    
    def get_document(self, collection_name: str, document_id: str) -> Dict[str, Any]:
        """Retrieve a document by its ID."""
        collection = self.db.get_collection(collection_name)
        astra_logger.info(f"Getting document with ID: {document_id}")
        return collection.find_one({"_id": document_id})
    
    def gat_all_documents(self, collection_name: str) -> List[Dict[str, Any]]:
        """Retrieve all documents from a collection."""
        collection = self.db.get_collection(collection_name)
        size_of_collection = collection.count_documents({}, upper_bound=1000)
        astra_logger.info(f"Getting all documents from '{collection_name}', found total of {size_of_collection} docs")
        return list(collection.find())
    
    def update_document(self, collection_name: str, document_id: str, update_data: Dict[str, Any]) -> None:
        """Update an existing document."""
        collection = self.db.get_collection(collection_name)
        astra_logger.info(f"Updating document with ID: {document_id}")
        collection.update_one({"_id": document_id}, {"$set": update_data})
    
    def delete_collection(self, collection_name: str) -> None:
        """Delete a collection by its name."""
        if collection_name in self.list_collections():
            self.db.drop_collection(collection_name)
            astra_logger.info(f"Collection '{collection_name}' deleted.")
        else:
            astra_logger.info(f"Collection '{collection_name}' does not exist.")
    
    def delete_document(self, collection_name: str, document_id: str) -> None:
        """Delete a document by its ID."""
        collection = self.db.get_collection(collection_name)
        astra_logger.info(f"Deleting document with ID: {document_id}")
        collection.delete_one({"_id": document_id})

