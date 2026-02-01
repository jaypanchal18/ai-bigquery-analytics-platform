import os
import subprocess

# Define project structure
project_structure = {
    "project_root": {
        "app": {
            "__init__.py": "",
            "routes.py": "",
            "models.py": "",
            "templates": {
                "index.html": "<!DOCTYPE html><html><head><title>Project</title></head><body><h1>Welcome to the Project</h1></body></html>",
            },
            "static": {
                "js": {
                    "app.js": "// D3.js code will go here",
                },
                "css": {
                    "styles.css": "body { font-family: Arial, sans-serif; }",
                },
            },
        },
        "requirements.txt": "Flask\nTensorFlow\ngoogle-cloud-bigquery\nnltk\nspacy\nd3",
        "app.py": """from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)""",
        "README.md": "# Project Title\n\n## Description\nThis is a basic project setup.",
        ".gitignore": "venv/\n__pycache__/\n*.pyc\n*.pyo\n*.pyd\n.DS_Store\n.env",
    }
}

# Function to create project structure
def create_project_structure(base_path, structure):
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_project_structure(path, content)
        else:
            with open(path, 'w') as file:
                file.write(content)

# Initialize the project
try:
    base_path = os.path.join(os.getcwd(), "project_root")
    create_project_structure(base_path, project_structure)
    subprocess.run(["git", "init"], cwd=base_path)
    print("Project setup completed successfully.")
except Exception as e:
    print(f"An error occurred during project setup: {e}")