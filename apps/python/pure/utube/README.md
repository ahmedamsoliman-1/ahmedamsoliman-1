youtube-view-counter/
│
├── config/
│   └── settings.py        # Configuration settings like API keys
│
├── src/
│   ├── youtube_api.py     # Module for YouTube API interaction (updated for OAuth2)
│   ├── update_title.py    # Main script to update the video title
│   └── utils.py           # Utility functions like logging
│
├── client_secret.json     # OAuth2 credentials file (add this to .gitignore)
├── token.json             # Stores access and refresh tokens
├── requirements.txt       # Required Python packages
├── .env                   # Environment variables for sensitive data
└── run.py                 # Script to trigger the update
