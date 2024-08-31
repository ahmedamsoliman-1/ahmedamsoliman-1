from astrapy import DataAPIClient
from typing import List, Dict, Any
from .config import Config
from utils import setup_logger

logger = setup_logger("main_script")

class AstraDB:
    def __init__(self):
        logger.info(f"ASTRA_DB_TOKEN: {Config.ASTRA_DB_TOKEN}")
        logger.info(f"DB_ENDPOINT: {Config.DB_ENDPOINT}")

        # Initialize the DataAPIClient with the token from config
        self.client = DataAPIClient(Config.ASTRA_DB_TOKEN)
        self.db = self.client.get_database_by_api_endpoint(Config.DB_ENDPOINT)
        logger.warning(f"Connected to Astra DB: {self.db.list_collection_names()}")

    def use_namespace(self, namespace_name: str) -> None:
        """Set the current namespace."""
        self.db.use_namespace(namespace_name)
        logger.info(f"Using namespace '{namespace_name}'.")
    
    def list_collections(self) -> List[str]:
        """List all collections in the database."""
        return self.db.list_collection_names()
    
    def create_collection(self, collection_name: str) -> None:
        """Create a new collection if not exists."""
        if collection_name not in self.list_collections():
            self.db.create_collection(collection_name)
        else:
            logger.info(f"Collection '{collection_name}' already exists.")

    def create_document(self, collection_name: str, document: Dict[str, Any]) -> str:
        """Create a new document in the specified collection."""
        collection = self.db.get_collection(collection_name)
        # Use the correct method for inserting a document
        result = collection.insert_one(document)
        logger.info(f"Document created with ID: {result.inserted_id}")
        return str(result.inserted_id)
    
    def get_document(self, collection_name: str, document_id: str) -> Dict[str, Any]:
        """Retrieve a document by its ID."""
        collection = self.db.get_collection(collection_name)
        logger.info(f"Getting document with ID: {document_id}")
        return collection.find_one({"_id": document_id})
    
    def gat_all_documents(self, collection_name: str) -> List[Dict[str, Any]]:
        """Retrieve all documents from a collection."""
        collection = self.db.get_collection(collection_name)
        size_of_collection = collection.count_documents({}, upper_bound=1000)
        logger.info(f"Getting all documents from '{collection_name}', found total of {size_of_collection} docs")
        return list(collection.find())
    
    def update_document(self, collection_name: str, document_id: str, update_data: Dict[str, Any]) -> None:
        """Update an existing document."""
        collection = self.db.get_collection(collection_name)
        logger.info(f"Updating document with ID: {document_id}")
        collection.update_one({"_id": document_id}, {"$set": update_data})
    
    def delete_collection(self, collection_name: str) -> None:
        """Delete a collection by its name."""
        if collection_name in self.list_collections():
            self.db.drop_collection(collection_name)
            logger.info(f"Collection '{collection_name}' deleted.")
        else:
            logger.info(f"Collection '{collection_name}' does not exist.")
    
    def delete_document(self, collection_name: str, document_id: str) -> None:
        """Delete a document by its ID."""
        collection = self.db.get_collection(collection_name)
        logger.info(f"Deleting document with ID: {document_id}")
        collection.delete_one({"_id": document_id})

# # ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_caller_name', '_caller_version', '_copy', 'environment', 'get_admin', 'get_async_database', 'get_async_database_by_api_endpoint', 'get_database', 'get_database_by_api_endpoint', 'set_caller', 'token_provider', 'with_options']
# # ['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattr__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', '_astra_db', '_copy', '_name', '_refresh_astra_db', 'api_endpoint', 'api_path', 'api_version', 'caller_name', 'caller_version', 'command', 'create_collection', 'drop_collection', 'environment', 'get_collection', 'get_database_admin', 'id', 'info', 'list_collection_names', 'list_collections', 'name', 'namespace', 'set_caller', 'to_async', 'token_provider', 'use_namespace', 'using_namespace', 'with_options']
