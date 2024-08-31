# logging_config.py

import logging

# Define ANSI escape codes for colors
class LogColors:
    RESET = "\033[0m"
    RED = "\033[31m"
    GREEN = "\033[32m"
    YELLOW = "\033[33m"
    BLUE = "\033[34m"
    MAGENTA = "\033[35m"
    CYAN = "\033[36m"
    WHITE = "\033[37m"

# Custom formatter to add colors based on log level and include date
class ColoredFormatter(logging.Formatter):
    def format(self, record):
        # Customize the log message with colors
        if record.levelno == logging.DEBUG:
            color = LogColors.CYAN
        elif record.levelno == logging.INFO:
            color = LogColors.GREEN
        elif record.levelno == logging.WARNING:
            color = LogColors.YELLOW
        elif record.levelno == logging.ERROR:
            color = LogColors.RED
        elif record.levelno == logging.CRITICAL:
            color = LogColors.MAGENTA
        else:
            color = LogColors.WHITE
        
        # Format the log message with timestamp and color
        log_msg = f"{color}{super().format(record)}{LogColors.RESET}"
        return log_msg

def setup_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    if not logger.hasHandlers():
        # Create a console handler
        console_handler = logging.StreamHandler()

        # Create a ColoredFormatter with a format that includes timestamp
        formatter = ColoredFormatter('%(asctime)s - %(levelname)s - %(message)s')
        console_handler.setFormatter(formatter)

        # Add the console handler to the logger
        logger.addHandler(console_handler)

        # Set the logging level
        logger.setLevel(logging.DEBUG)  # You can adjust this to INFO or another level as needed

    return logger
