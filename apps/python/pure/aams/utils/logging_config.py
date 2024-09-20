import logging
import os
import colorlog

def setup_logger(name):
    """Setup logger with color output."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    if not logger.hasHandlers():
        handler = logging.StreamHandler()
        formatter = colorlog.ColoredFormatter(
            '%(log_color)s%(asctime)s [%(name)s] - %(levelname)s : %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
            log_colors={
                'DEBUG': 'cyan',
                'INFO': 'green',
                'WARNING': 'yellow',
                'ERROR': 'red',
                'CRITICAL': 'bold_red',
            }
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    
    return logger
