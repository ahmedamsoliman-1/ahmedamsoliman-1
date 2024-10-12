import pandas as pd
import uuid
from elasticsearch import helpers
from utils import setup_logger

es_logger = setup_logger("etl-es")

class CSVToESETL:
    def __init__(self, es_db, es_index):
        """
        Initialize the ETL class with ElasticsearchDB connection and index.
        :param es_db: Instance of ElasticsearchDB for connection management.
        :param es_index: Name of the Elasticsearch index.
        """
        self.es_db = es_db
        self.es_index = es_index

    def extract(self, csv_file):
        """
        Extract data from a CSV file using pandas.
        :param csv_file: Path to the CSV file.
        :return: DataFrame containing the CSV data.
        """
        try:
            data = pd.read_csv(csv_file)
            es_logger.info(f"Extracted {len(data)} records from {csv_file}")
            return data
        except Exception as e:
            es_logger.error(f"Error extracting data: {e}")
            return None

    def transform(self, data):
        """
        Transform data into a format suitable for Elasticsearch.
        :param data: DataFrame containing the extracted data.
        :return: List of transformed records as dictionaries.
        """
        try:
            transformed_data = []
            
            # Replace NaN values with None or a default value (e.g., empty string)
            data = data.where(pd.notnull(data), None)

            for _, row in data.iterrows():
                # Create a dynamic _source dict with all fields from the row
                record = {
                    "_id": str(uuid.uuid4()),  # Generating a unique ID for Elasticsearch
                    "_source": row.to_dict()  # Dynamically convert the entire row to a dict
                }
                transformed_data.append(record)
            
            es_logger.info(f"Transformed {len(transformed_data)} records")
            return transformed_data
        except Exception as e:
            es_logger.error(f"Error transforming data: {e}")
            return None


    def load(self, data):
        """
        Load data into Elasticsearch.
        :param data: List of transformed data records.
        """
        try:
            if data:
                client = self.es_db.get_client()
                helpers.bulk(client, data, index=self.es_index)
                es_logger.info(f"Loaded {len(data)} records into Elasticsearch index {self.es_index}")
        except Exception as e:
            es_logger.error(f"Error loading data: {e}")

    def run_etl(self, csv_file):
        """
        Run the full ETL process: Extract -> Transform -> Load.
        :param csv_file: Path to the CSV file to be processed.
        """
        data = self.extract(csv_file)
        # print(data)
        if data is not None:
            transformed_data = self.transform(data)
            if transformed_data is not None:
                self.load(transformed_data)






# import pandas as pd
# import uuid
# from elasticsearch import helpers
# from utils import setup_logger

# es_logger = setup_logger("etl-es")


# class CSVToESETL:
#     def __init__(self, es_db, es_index):
#         self.es_db = es_db
#         self.es_index = es_index

#     def extract(self, csv_file):
#         try:
#             data = pd.read_csv(csv_file)
#             es_logger.info(f"Extracted {len(data)} records from {csv_file}")
#             return data
#         except Exception as e:
#             es_logger.error(f"Error extracting data: {e}")
#             return None

#     def transform(self, data):
#         """
#         Transform data into a format suitable for Elasticsearch.
#         - Replace NaN values in string fields with an empty string.
#         - Handle numeric fields appropriately.
#         """
#         try:
#             transformed_data = []
#             for _, row in data.iterrows():
#                 # Replace NaN values in the row with defaults ("" for strings, 0 or None for numerics)
#                 record = {
#                     "_id": str(uuid.uuid4()),
#                     "_source": {
#                         "userid": row['userid'] if pd.notna(row['userid']) else str(uuid.uuid4()),
#                         "full_name": row['full_name'] if pd.notna(row['full_name']) else "",
#                         "ride_year": row['ride_year'] if pd.notna(row['ride_year']) else None,
#                         "ride_month": row['ride_month'] if pd.notna(row['ride_month']) else None,
#                         "month_name": row['month_name'] if pd.notna(row['month_name']) else "",
#                         "year_month": row['year_month'] if pd.notna(row['year_month']) else "",
#                         "ride_duration_seconds": row['ride_duration_seconds'] if pd.notna(row['ride_duration_seconds']) else 0,
#                         "ride_duration_hrsmins": row['ride_duration_hrsmins'] if pd.notna(row['ride_duration_hrsmins']) else "0 Hrs 0 Mins",
#                         "datasource": row['datasource'] if pd.notna(row['datasource']) else "Unknown"
#                     }
#                 }
#                 transformed_data.append(record)

#             es_logger.info(f"Transformed {len(transformed_data)} records")
#             return transformed_data
#         except Exception as e:
#             es_logger.error(f"Error transforming data: {e}")
#             return None

#     def load(self, data):
#         try:
#             if data:
#                 client = self.es_db.get_client()  # Use the ElasticsearchDB client
#                 helpers.bulk(client, data, index=self.es_index)
#                 es_logger.info(f"Loaded {len(data)} records into Elasticsearch index {self.es_index}")
#         except Exception as e:
#             es_logger.error(f"Error loading data: {e}")

#     def run_etl(self, csv_file):
#         data = self.extract(csv_file)
#         if data is not None:
#             transformed_data = self.transform(data)
#             if transformed_data is not None:
#                 self.load(transformed_data)
