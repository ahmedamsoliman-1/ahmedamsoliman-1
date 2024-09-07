import time
import requests
import concurrent.futures
from utils import StreamLogger

stream_logger = StreamLogger()

# Define the hosts (URLs) to be tested directly in the script
HOSTS = [
    "https://ai-beta.avrioc.io/trainingui",
    "https://ai-beta.avrioc.io/trainingui-prod",
]

# Set default parameters for the load test
DURATION = 10                   # Duration of the test in seconds
REQUESTS_PER_SECOND = 10        # Total requests per second across all hosts

def send_request(url):
    """Send a GET request to the specified URL and return response status."""
    try:
        response = requests.get(url)
        return response.status_code
    except requests.exceptions.RequestException as e:
        return f"Error: {e}"

def load_test(urls, duration, requests_per_second):
    """Perform load test on multiple URLs by sending multiple requests per second."""
    end_time = time.time() + duration
    total_requests = {url: 0 for url in urls}
    successful_requests = {url: 0 for url in urls}
    failed_requests = {url: 0 for url in urls}

    def worker(url):
        """Task that sends one request to a specific URL and checks the result."""
        status_code = send_request(url)
        total_requests[url] += 1
        if isinstance(status_code, int) and status_code == 200:
            successful_requests[url] += 1
        else:
            failed_requests[url] += 1

    # ThreadPoolExecutor for concurrent requests
    with concurrent.futures.ThreadPoolExecutor() as executor:
        while time.time() < end_time:
            # Submit tasks for each URL
            futures = []
            for url in urls:
                for _ in range(requests_per_second // len(urls)):
                    futures.append(executor.submit(worker, url))
            concurrent.futures.wait(futures)
            time.sleep(1)  # Pause for 1 second between request bursts

    # Print the results for each URL
    for url in urls:
        stream_logger.stream_logger.system(f"Results for {url}")
        stream_logger.stream_logger.system(f"{total_requests[url]}")
        print(f"  Successful requests: {successful_requests[url]}")
        print(f"  Failed requests: {failed_requests[url]}")
        print()

if __name__ == "__main__":
    # Run the load test with predefined hosts, duration, and requests per second
    load_test(HOSTS, DURATION, REQUESTS_PER_SECOND)
