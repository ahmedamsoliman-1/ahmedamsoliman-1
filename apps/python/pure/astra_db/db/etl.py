from typing import List, Dict, Any
from .db import AstraDB
import datetime

class ETLProcess:
    def __init__(self, db: AstraDB):
        self.db = db

    def perform_etl(self, source_data: List[Dict[str, Any]], collection_name: str) -> None:
        """Perform ETL process: Extract, Transform, Load."""
        for data in source_data:
            transformed_data = self.transform_data(data)
            self.db.create_document(collection_name, transformed_data)
    
    def transform_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Transform data before loading it into the database."""
        # Example transformation: Add a timestamp to the data
        data['timestamp'] = datetime.datetime.now().isoformat()
        return data
