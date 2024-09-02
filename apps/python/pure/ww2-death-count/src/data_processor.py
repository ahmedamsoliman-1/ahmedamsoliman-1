import pandas as pd

def process_data(data: pd.DataFrame) -> pd.DataFrame:
    """Process the data for visualization."""
    # Example processing: drop rows with missing values
    processed_data = data.dropna()
    return processed_data
