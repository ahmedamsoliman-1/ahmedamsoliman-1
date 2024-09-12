from src.youtube_api import fetch_view_count, update_video_title
from config.settings import VIDEO_ID
from src.utils import log

def update_video():
    try:
        log("Fetching video view count...")
        view_count = fetch_view_count(VIDEO_ID)

        update_video_title(VIDEO_ID, view_count)
        log(f"Successfully updated video title with {view_count} views.")
    except Exception as e:
        log(f"Error occurred: {e}")

def main():
    update_video()

if __name__ == "__main__":
    main()
