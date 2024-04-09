from flask import Flask

from .views.index.index import index
from .views.sudoku_preview.sudoku_preview import sudoku_preview

from .models.puzzles import puzzles_db


class App:

    app = Flask(__name__)

    def __init__(self):

        self.__register_blueprints()    

    def run(self, debug=True):

        self.app.run(debug=debug)

    def __register_blueprints(self):

        self.app.register_blueprint(index)
        self.app.register_blueprint(sudoku_preview)

    def __initialize_models(self):

        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sudoku.db'
        puzzles_db.init_app(self.app)

        with self.app.app_context():
            puzzles_db.create_all()

