import psycopg2
from psycopg2 import sql
from psycopg2.extras import RealDictCursor
from utils import setup_logger, Config

db_logger = setup_logger('database-posgresql')

class PostgresDB:
    def __init__(self):
        """Initialize the database connection using configuration."""
        self.dbname = Config.POSTGRES_DB_NAME
        self.user = Config.POSTGRES_DB_USER
        self.password = Config.POSTGRES_DB_PASSWORD
        self.host = Config.POSTGRES_DB_HOST
        self.port = Config.POSTGRES_DB_PORT
        self.conn = None
        db_logger.info("Database initialized with the following details:")
        db_logger.info(f"DB_NAME: {self.dbname}, DB_HOST: {self.host}")

    def connect(self):
        """Connect to the PostgreSQL database."""
        try:
            self.conn = psycopg2.connect(
                dbname=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port
            )
            db_logger.info(f"Connected to {self.host} database successfully.")
        except Exception as e:
            db_logger.error(f"Error connecting to the database: {e}")

    def disconnect(self):
        """Close the database connection."""
        if self.conn:
            self.conn.close()
            db_logger.info("Database connection closed.")


    def execute_query(self, query, params=None):
        """Execute a query (INSERT, UPDATE, DELETE)."""
        try:
            with self.conn.cursor() as cur:
                cur.execute(query, params)
                self.conn.commit()
                db_logger.info("Query executed successfully.")
        except Exception as e:
            self.conn.rollback()
            db_logger.error(f"Error executing query: {e}")

    def fetch_all(self, query, params=None):
        """Fetch all results from a SELECT query."""
        try:
            with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, params)
                return cur.fetchall()
        except Exception as e:
            db_logger.error(f"Error fetching data: {e}")
            return []

    def fetch_one(self, query, params=None):
        """Fetch a single result from a SELECT query."""
        try:
            with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, params)
                return cur.fetchone()
        except Exception as e:
            db_logger.error(f"Error fetching data: {e}")
            return None
    
    def insert(self, table, data):
        """Insert data into a table."""
        keys = data.keys()
        values = [data[key] for key in keys]
        
        query = sql.SQL("INSERT INTO {table} ({fields}) VALUES ({values}) RETURNING id").format(
            table=sql.Identifier(table),
            fields=sql.SQL(', ').join(map(sql.Identifier, keys)),
            values=sql.SQL(', ').join(sql.Placeholder() * len(values))
        )
        
        try:
            with self.conn.cursor() as cur:
                cur.execute(query, values)
                self.conn.commit()
                return cur.fetchone()[0]  # Return the id of the inserted row
        except Exception as e:
            self.conn.rollback()
            print(f"Error inserting data: {e}")
            return None

    def update(self, table, data, condition):
        """Update records in a table."""
        keys = data.keys()
        values = [data[key] for key in keys]
        set_clause = ', '.join(f"{key} = %s" for key in keys)

        query = f"UPDATE {table} SET {set_clause} WHERE {condition}"
        
        try:
            with self.conn.cursor() as cur:
                cur.execute(query, values)
                self.conn.commit()
                print("Record updated successfully.")
        except Exception as e:
            self.conn.rollback()
            print(f"Error updating record: {e}")

    def delete(self, table, condition, params=None):
        """Delete records from a table."""
        query = f"DELETE FROM {table} WHERE {condition}"
        
        try:
            with self.conn.cursor() as cur:
                cur.execute(query, params)
                self.conn.commit()
                print("Record deleted successfully.")
        except Exception as e:
            self.conn.rollback()
            print(f"Error deleting record: {e}")

    def create_table(self, table_name, schema):
        """Create a table with a given schema."""
        try:
            query = f"CREATE TABLE IF NOT EXISTS {table_name} ({schema})"
            self.execute_query(query)
            print(f"Table {table_name} created successfully.")
        except Exception as e:
            print(f"Error creating table: {e}")

    def list_tables(self):
        """List all tables in the database."""
        try:
            with self.conn.cursor() as cur:
                cur.execute("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'")
                tables = cur.fetchall()
                return [table[0] for table in tables]
        except Exception as e:
            print(f"Error listing tables: {e}")
            return []




if __name__ == '__main__':
    db = PostgresDB(dbname='your_db', user='your_user', password='your_password', host='localhost')

    db.connect()

    # Create a table
    db.create_table('employees', 'id SERIAL PRIMARY KEY, name VARCHAR(100), role VARCHAR(100)')

    # Insert data
    new_id = db.insert('employees', {'name': 'John Doe', 'role': 'Developer'})
    print(f"Inserted row with id: {new_id}")

    # Fetch all records
    employees = db.fetch_all("SELECT * FROM employees")
    print(employees)

    # Fetch a single record
    employee = db.fetch_one("SELECT * FROM employees WHERE id = %s", (new_id,))
    print(employee)

    # Update a record
    db.update('employees', {'role': 'Senior Developer'}, f"id = {new_id}")

    # Delete a record
    db.delete('employees', "id = %s", (new_id,))

    db.disconnect()


