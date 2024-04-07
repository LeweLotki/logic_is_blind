from flask import Flask
from .index.routes import index
from .sudoku_preview.routes import sudoku_preview

def create_app():
    app = Flask(__name__)
    
    app.register_blueprint(index)
    app.register_blueprint(sudoku_preview)

    return app

