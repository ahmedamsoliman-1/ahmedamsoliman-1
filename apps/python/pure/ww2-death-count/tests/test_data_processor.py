import pytest
import pandas as pd
from src.data_processor import process_data

def test_process_data():
    data = pd.DataFrame({
        'Country': ['USA', 'Germany', 'UK'],
        'Deaths': [400000, 600000, 500000]
    })
    processed_data = process_data(data)
    assert not processed_data.empty
    assert processed_data['Deaths'].isnull().sum() == 0
