from astrapy import DataAPIClient
from typing import List, Dict, Any
from .config import Config


class AstraDB:
    def __init__(self):
        print(f"ASTRA_DB_TOKEN: {Config.ASTRA_DB_TOKEN}")
        print(f"DB_ENDPOINT: {Config.DB_ENDPOINT}")

        # Initialize the DataAPIClient with the token from config
        self.client = DataAPIClient(Config.ASTRA_DB_TOKEN)
        self.db = self.client.get_database_by_api_endpoint(Config.DB_ENDPOINT)
        print(f"Connected to Astra DB: {self.db.list_collection_names()}")

    def list_collections(self) -> List[str]:
        """List all collections in the database."""
        return self.db.list_collection_names()

    def create_document(self, collection_name: str, document: Dict[str, Any]) -> str:
        """Create a new document in the specified collection."""
        collection = self.db.get_collection(collection_name)
        return collection.create(document)
    
    def get_document(self, collection_name: str, document_id: str) -> Dict[str, Any]:
        """Retrieve a document by its ID."""
        collection = self.db.get_collection(collection_name)
        return collection.get(document_id)
    
    def update_document(self, collection_name: str, document_id: str, update_data: Dict[str, Any]) -> None:
        """Update an existing document."""
        collection = self.db.get_collection(collection_name)
        collection.update(document_id, update_data)
    
    def delete_document(self, collection_name: str, document_id: str) -> None:
        """Delete a document by its ID."""
        collection = self.db.get_collection(collection_name)
        collection.delete(document_id)

    def close_connection(self):
        """Close the Astra DB connection."""
        self.client.close()
