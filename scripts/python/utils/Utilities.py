import subprocess
import logging 
import sys

class LogFormatter(logging.Formatter):
    
    grey = '\x1b[38;21m'
    blue = '\x1b[38;5;39m'
    yellow = '\x1b[38;5;11m'
    red = '\x1b[38;5;196m'
    bold_red = '\x1b[31;1m'
    reset = '\x1b[0m'
    green = '\x1b[38;5;40m'

    def __init__(self, fmt):
        super().__init__()
        self.fmt = fmt
        self.FORMATS = {
            logging.DEBUG: self.grey + self.fmt + self.reset,
            25: self.green + self.fmt + self.reset,
            logging.WARNING: self.yellow + self.fmt + self.reset,
            logging.ERROR: self.red + self.fmt + self.reset,
            logging.INFO: self.blue + self.fmt + self.reset,
            logging.CRITICAL: self.bold_red + self.fmt + self.reset
        }

    def format(self, msg):
        log = self.FORMATS.get(msg.levelno)
        formatter = logging.Formatter(log)
        return formatter.format(msg)


class StreamLogger():
    
    def __init__(self) -> None:
        format = f"%(asctime)s | %(levelname)8s | %(message)s"
        stream_handler = logging.StreamHandler(sys.stdout)
        
        # Use the updated LogFormatter class
        stream_handler.setFormatter(LogFormatter(format))
        
        logging.basicConfig(format=format, handlers=[stream_handler])
        
        # Add the "green" (INFO) log level and assign it the word "info"
        logging.addLevelName(logging.INFO, "INFO")
        
        # Add the "SYSTEM" log level as you did before
        logging.addLevelName(25, "SYSTEM")
        
        logging.system = self.system
        logging.Logger.system = self.system
        self.stream_logger = logging.getLogger(name="CS2 Stream Logger")
        
        # Set the log level for "info" (green) logs
        self.stream_logger.setLevel(logging.INFO)
        
    def system(self, msg, *args, **kwargs):
        if logging.getLogger(name="CS2 Stream Logger").isEnabledFor(25):
            logging.getLogger(name="CS2 Stream Logger").log(25, msg)

def run_command(command):
    stream_logger = StreamLogger()
    """Run a shell command and return the output and error."""
    stream_logger.stream_logger.system(command)
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    if output: stream_logger.stream_logger.info(output.decode('utf-8'))
    if error: stream_logger.stream_logger.error(error.decode('utf-8'))

if __name__ == '__main__':
    import random, string

    stream_logger = StreamLogger()

    random_string_length = random.randint(1, 50)
    str = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(random_string_length))

    stream_logger.stream_logger.system(str)
    stream_logger.stream_logger.warning(str)
    stream_logger.stream_logger.error(str)
    stream_logger.stream_logger.info(str)
    stream_logger.stream_logger.critical(str)