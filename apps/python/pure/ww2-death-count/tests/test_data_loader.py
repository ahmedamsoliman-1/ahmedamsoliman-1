import pytest
from src.data_loader import load_data

def test_load_data():
    data = load_data('data/ww2_death_counts.csv')
    assert not data.empty
    assert 'Country' in data.columns
    assert 'Deaths' in data.columns
