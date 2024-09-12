
import os
import json
import googleapiclient.discovery
import google_auth_oauthlib.flow
import google.auth.transport.requests
import google.oauth2.credentials
from src.utils import log
from config.settings import SCOPES, CLIENT_SECRETS_FILE, TOKEN_FILE




def update_video_description(video_id, description_text):
    youtube = get_youtube_client()
    """Updates the description of a YouTube video."""
    log(f"Updating description for video ID: {video_id}")
    try:
        video_response = youtube.videos().list(
            part="snippet",
            id=video_id
        ).execute()

        # Modify the description
        video_snippet = video_response["items"][0]["snippet"]
        video_snippet["description"] = description_text

        # Update the video with new description
        update_request = youtube.videos().update(
            part="snippet",
            body={
                "id": video_id,
                "snippet": video_snippet
            }
        )
        update_request.execute()

        log("Description updated successfully.")
    except Exception as e:
        log(f"Error occurred: {e}")


def post_comment(video_id, comment_text):
    youtube = get_youtube_client()
    """Posts a comment on a YouTube video."""
    log(f"Posting comment on video ID: {video_id}")
    try:
        request = youtube.commentThreads().insert(
            part="snippet",
            body={
                "snippet": {
                    "videoId": video_id,
                    "topLevelComment": {
                        "snippet": {
                            "textOriginal": comment_text
                        }
                    }
                }
            }
        )
        response = request.execute()
        log(f"Comment posted: {response['snippet']['topLevelComment']['snippet']['textOriginal']}")
    except Exception as e:
        log(f"Error occurred: {e}")


def get_oauth2_credentials():
    credentials = None

    if os.path.exists(TOKEN_FILE):
        log("Loading saved credentials...")
        with open(TOKEN_FILE, "r") as token:
            token_info = json.load(token) 
            credentials = google.oauth2.credentials.Credentials.from_authorized_user_info(token_info)

    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            log("Refreshing credentials...")
            credentials.refresh(google.auth.transport.requests.Request())
        else:
            log("No valid credentials, starting OAuth2 flow...")
            flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
            credentials = flow.run_local_server(port=0)
            
        with open(TOKEN_FILE, "w") as token:
            token.write(credentials.to_json())

    return credentials



def get_youtube_client():
    credentials = get_oauth2_credentials()
    return googleapiclient.discovery.build('youtube', 'v3', credentials=credentials)

def fetch_view_count(video_id):
    youtube = get_youtube_client()
    log("Fetching video view count...")

    request = youtube.videos().list(part="statistics", id=video_id)
    response = request.execute()

    view_count = response['items'][0]['statistics']['viewCount']
    log(f"View count: {view_count}")
    
    return int(view_count)

def update_video_title(video_id, view_count):
    youtube = get_youtube_client()
    log("Fetching current video details...")

    video_response = youtube.videos().list(part='snippet', id=video_id).execute()
    current_title = video_response['items'][0]['snippet']['title']
    category_id = video_response['items'][0]['snippet']['categoryId']

    new_title = f"Fallen Hero: Defending Freedom – [{view_count}] Voices Heard"
    
    log(f"Updating video title to: {new_title}")

    request = youtube.videos().update(
        part="snippet",
        body={
            "id": video_id,
            "snippet": {
                "categoryId": category_id,
                "title": new_title,
                "description": video_response['items'][0]['snippet']['description']
            }
        }
    )
    response = request.execute()

    log("Video title updated successfully.")
