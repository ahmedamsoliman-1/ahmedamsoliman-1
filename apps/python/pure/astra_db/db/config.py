import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    ASTRA_DB_TOKEN = os.getenv("ASTRA_DB_TOKEN")
    DB_ENDPOINT = os.getenv("DB_ENDPOINT")
