import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

def visualize_data(data: pd.DataFrame) -> None:
    """Visualize the data."""
    plt.figure(figsize=(12, 8))
    sns.barplot(x='Country', y='Deaths', data=data)
    plt.title('WW2 Death Counts by Country')
    plt.xlabel('Country')
    plt.ylabel('Death Count')
    plt.xticks(rotation=90)
    plt.tight_layout()
    plt.show()
