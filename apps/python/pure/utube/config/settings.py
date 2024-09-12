# config/settings.py

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Key and Video ID
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
VIDEO_ID = os.getenv('VIDEO_ID')

if not YOUTUBE_API_KEY or not VIDEO_ID:
    raise ValueError("Please set YOUTUBE_API_KEY and VIDEO_ID in your environment")
