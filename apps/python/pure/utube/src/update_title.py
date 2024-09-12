# src/update_title.py

from src.youtube_api import fetch_view_count, update_video_title
from src.utils import log

def main():
    try:
        # Fetch the view count
        view_count = fetch_view_count()

        # Update the video title with view count
        update_video_title(view_count)
    except Exception as e:
        log(f"Error occurred: {e}")

if __name__ == "__main__":
    main()
