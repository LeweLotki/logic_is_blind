from flask import Flask
from .index.index import index
from .sudoku_preview.sudoku_preview import sudoku_preview


class App:

    app = Flask(__name__)

    def __init__(self):

        self.__register_blueprints()    

    def run(self, debug=True):

        self.app.run(debug=debug)

    def __register_blueprints(self):

        self.app.register_blueprint(index)
        self.app.register_blueprint(sudoku_preview)

