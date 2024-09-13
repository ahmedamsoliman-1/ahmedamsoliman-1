from pymongo import MongoClient
from typing import List, Dict, Any
from utils import setup_logger, Config

mongo_logger = setup_logger("database-mongo")

class MongoDB:
    def __init__(self):
        """Initialize the MongoDB connection using URI from config."""
        self.uri = Config.MONGO_DB_URI
        mongo_logger.info(f"Connecting to MongoDB at: {self.uri}")
        
        # Initialize MongoClient with the MongoDB URI
        self.client = MongoClient(self.uri)
        self.db = self.client.get_database()  # You can also specify the database name in URI

        mongo_logger.info(f"Connected to MongoDB: {self.db.name}")
    
    def list_databases(self) -> List[str]:
        """List all databases in the MongoDB instance."""
        databases = self.client.list_database_names()
        mongo_logger.info(f"Databases in MongoDB: {databases}")
        return databases
    
    
    def use_database(self, database_name: str) -> None:
        """Switch to a different database."""
        self.db = self.client[database_name]
        mongo_logger.info(f"Using database '{database_name}'.")
    
    def list_collections(self) -> List[str]:
        """List all collections in the current database."""
        collections = self.db.list_collection_names()
        mongo_logger.info(f"Collections in '{self.db.name}': {collections}")
        return collections
    
    def create_collection(self, collection_name: str) -> None:
        """Create a new collection if it doesn't exist."""
        if collection_name not in self.list_collections():
            self.db.create_collection(collection_name)
            mongo_logger.info(f"Collection '{collection_name}' created.")
        else:
            mongo_logger.info(f"Collection '{collection_name}' already exists.")
    
    def create_document(self, collection_name: str, document: Dict[str, Any]) -> str:
        """Insert a new document into the specified collection."""
        collection = self.db[collection_name]
        result = collection.insert_one(document)
        mongo_logger.info(f"Document inserted into '{collection_name}' with ID: {result.inserted_id}")
        return str(result.inserted_id)
    
    def get_document(self, collection_name: str, document_id: str) -> Dict[str, Any]:
        """Retrieve a document by its ID."""
        collection = self.db[collection_name]
        document = collection.find_one({"_id": document_id})
        mongo_logger.info(f"Retrieved document from '{collection_name}' with ID: {document_id}")
        return document
    
    def get_all_documents(self, collection_name: str) -> List[Dict[str, Any]]:
        """Retrieve all documents from the specified collection."""
        collection = self.db[collection_name]
        documents = list(collection.find())
        mongo_logger.info(f"Retrieved {len(documents)} documents from '{collection_name}'.")
        return documents
    
    def update_document(self, collection_name: str, document_id: str, update_data: Dict[str, Any]) -> None:
        """Update an existing document by its ID."""
        collection = self.db[collection_name]
        collection.update_one({"_id": document_id}, {"$set": update_data})
        mongo_logger.info(f"Document with ID {document_id} updated in '{collection_name}'.")
    
    def delete_document(self, collection_name: str, document_id: str) -> None:
        """Delete a document by its ID."""
        collection = self.db[collection_name]
        collection.delete_one({"_id": document_id})
        mongo_logger.info(f"Document with ID {document_id} deleted from '{collection_name}'.")
    
    def delete_collection(self, collection_name: str) -> None:
        """Delete an entire collection."""
        if collection_name in self.list_collections():
            self.db.drop_collection(collection_name)
            mongo_logger.info(f"Collection '{collection_name}' deleted.")
        else:
            mongo_logger.info(f"Collection '{collection_name}' does not exist.")
