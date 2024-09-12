# src/utils.py

import logging

# Simple logging setup
def log(message):
    logging.basicConfig(level=logging.INFO)
    logging.info(message)
