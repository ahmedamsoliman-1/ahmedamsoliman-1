import os

# Define the directory structure and files
structure = {
    "project-name": {
        "data": ["ww2_death_counts.csv"],
        "src": [
            "__init__.py",
            "data_loader.py",
            "data_processor.py",
            "visualizer.py"
        ],
        "tests": [
            "__init__.py",
            "test_data_loader.py",
            "test_data_processor.py",
            "test_visualizer.py"
        ],
        "requirements.txt": "",
        "README.md": "# Project Name.",
        "main.py": ""
    }
}

def create_structure(base_path, structure):
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        elif isinstance(content, list):
            os.makedirs(path, exist_ok=True)
            for file_name in content:
                file_path = os.path.join(base_path, name, file_name)
                with open(file_path, 'w') as file:
                    # Optional: Add initial content to files if needed
                    pass
        elif isinstance(content, str):
            with open(path, 'w') as file:
                file.write(content)

# Create the directory structure and files
create_structure('.', structure)
