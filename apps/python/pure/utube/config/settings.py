import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Key and Video ID
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
VIDEO_ID = os.getenv('VIDEO_ID')

SCHEDULED_RUN = os.getenv('SCHEDULED_RUN')

if not YOUTUBE_API_KEY or not VIDEO_ID:
    raise ValueError("Please set YOUTUBE_API_KEY and VIDEO_ID in your environment")

SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"]
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENT_SECRETS_FILE = f"{ROOT_DIR}/client_secret.json"
TOKEN_FILE = f"{ROOT_DIR}/token.json"