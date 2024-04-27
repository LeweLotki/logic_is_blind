from flask import Blueprint, send_from_directory, current_app
import os

index = Blueprint('index', __name__)

@index.route('/')
def home():
    build_dir = os.path.join(current_app.root_path, '..', 'frontend', 'build')
    return send_from_directory(build_dir, 'index.html')

