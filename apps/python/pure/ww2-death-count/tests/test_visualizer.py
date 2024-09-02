import pytest
from src.visualizer import visualize_data

def test_visualize_data():
    data = {
        'Country': ['USA', 'Germany', 'UK'],
        'Deaths': [400000, 600000, 500000]
    }
    df = pd.DataFrame(data)
    try:
        visualize_data(df)
    except Exception as e:
        pytest.fail(f"Visualization failed: {e}")
