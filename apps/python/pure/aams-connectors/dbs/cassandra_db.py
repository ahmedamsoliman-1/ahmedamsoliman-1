from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from typing import List, Dict, Any
from utils import setup_logger, Config

cassandra_logger = setup_logger("database-cassandra")

class CassandraDB:
    def __init__(self):
        """Initialize the Cassandra connection using the configuration."""
        self.contact_points = Config.CASSANDRA_CONTACT_POINTS.split(',')
        self.keyspace = Config.CASSANDRA_KEYSPACE
        self.username = Config.CASSANDRA_USERNAME
        self.password = Config.CASSANDRA_PASSWORD
        
        # Initialize the connection
        self.cluster = Cluster(self.contact_points, auth_provider=PlainTextAuthProvider(self.username, self.password))
        self.session = self.cluster.connect()
        cassandra_logger.info(f"Connecting to Cassandra with contact points: {self.contact_points}")

        # Create keyspace if it does not exist
        self.create_keyspace(self.keyspace)
        self.session.set_keyspace(self.keyspace)
        cassandra_logger.info(f"Connected to Cassandra keyspace: {self.keyspace}")
    
    def db_info(self):
        """ Get Cassandra info """
        cassandra_logger.info(f"Cassandra DB info: {self.session}")

    def create_keyspace(self, keyspace_name: str) -> None:
        """Create a keyspace if not exists."""
        try:
            self.session.execute(f"""
                CREATE KEYSPACE IF NOT EXISTS {keyspace_name}
                WITH replication = {{ 'class': 'SimpleStrategy', 'replication_factor': 1 }}
            """)
            cassandra_logger.info(f"Keyspace '{keyspace_name}' created or already exists.")
        except Exception as e:
            cassandra_logger.error(f"Error creating keyspace: {e}")

    def create_table(self, table_name: str, schema: str) -> None:
        """Create a table with a given schema."""
        try:
            self.session.execute(f"""
                CREATE TABLE IF NOT EXISTS {table_name} ({schema})
            """)
            cassandra_logger.info(f"Table '{table_name}' created with schema: {schema}")
        except Exception as e:
            cassandra_logger.error(f"Error creating table: {e}")

    def insert(self, table_name: str, columns: List[str], values: List[str]) -> None:
        """Insert data into a table."""
        columns_str = ', '.join(columns)
        values_placeholder = ', '.join(['%s'] * len(values))
        query = f"INSERT INTO {table_name} ({columns_str}) VALUES ({values_placeholder})"
        try:
            self.session.execute(query, values)
            cassandra_logger.info(f"Inserted data into table '{table_name}' with values: {values}")
        except Exception as e:
            cassandra_logger.error(f"Error inserting data: {e}")

    def query(self, query: str, params: List[str] = []) -> List[Dict[str, Any]]:
        """Execute a query and return the results."""
        try:
            results = self.session.execute(query, params)
            return [dict(row) for row in results]
        except Exception as e:
            cassandra_logger.error(f"Error executing query: {e}")
            return []

    def close(self) -> None:
        """Close the Cassandra connection."""
        self.cluster.shutdown()
        cassandra_logger.info("Cassandra connection closed.")
