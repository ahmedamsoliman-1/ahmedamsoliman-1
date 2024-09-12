# src/youtube_api.py

import googleapiclient.discovery
from config.settings import YOUTUBE_API_KEY, VIDEO_ID
from src.utils import log

# Initialize the YouTube API client
def get_youtube_client():
    return googleapiclient.discovery.build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

# Fetch view count of the video
def fetch_view_count():
    youtube = get_youtube_client()
    log("Fetching video view count...")

    request = youtube.videos().list(part="statistics", id=VIDEO_ID)
    response = request.execute()

    view_count = response['items'][0]['statistics']['viewCount']
    log(f"View count: {view_count}")
    
    return int(view_count)

# Update the video title with view count
def update_video_title(view_count):
    youtube = get_youtube_client()
    log("Fetching current video details...")

    # Get the current video details
    video_response = youtube.videos().list(part='snippet', id=VIDEO_ID).execute()
    current_title = video_response['items'][0]['snippet']['title']
    category_id = video_response['items'][0]['snippet']['categoryId']

    log(f"Current video title: {current_title}")
    log(f"Category ID: {category_id}")
    

    # Prepare the new title
    new_title = f"{current_title} - {view_count} views"
    
    log(f"Updating video title to: {new_title}")

    # Update the video title
    request = youtube.videos().update(
        part="snippet",
        body={
            "id": VIDEO_ID,
            "snippet": {
                "categoryId": category_id,
                "title": new_title,
                "description": video_response['items'][0]['snippet']['description']
            }
        }
    )
    response = request.execute()

    log("Video title updated successfully.")
