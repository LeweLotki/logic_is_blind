from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS

import click
import logging

from .views.index.index import index

from .models import db

from .api.serializers.puzzle_list import puzzle_list_serializer 
from .api.serializers.pop_up import pop_up_serializer 
from .api.session.token_check import token_check 
from .api.solve.set_digit import set_digit
from .api.solve.get_cells import get_cells

from .services.scraper import Scraper


class App:

    app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
    
    def __init__(self, *args, **kwargs):
 
        logging.basicConfig(filename='app.log', level=logging.INFO)
        self.logger = logging.getLogger(__name__)

        self.__register_models()
        self.__register_blueprints()    
        self.__register_commands()
        self.__register_migrate()
        self.__register_cors()

    def __call__(self, environ, start_response):
        return self.app(environ, start_response)

    def run(self, debug=True):

        self.app.run(debug=debug)

    def __register_blueprints(self):

        self.app.register_blueprint(index)
        self.app.register_blueprint(puzzle_list_serializer, url_prefix='/serializer')
        self.app.register_blueprint(pop_up_serializer, url_prefix='/serializer')
        self.app.register_blueprint(token_check, url_prefix='/session')
        self.app.register_blueprint(set_digit, url_prefix='/solve')
        self.app.register_blueprint(get_cells, url_prefix='/solve')

    def __register_models(self):

        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sudoku.db'
        db.init_app(self.app)

        with self.app.app_context():
            db.create_all()

    def __register_commands(self):

        @self.app.cli.command("run-scraper")
        @click.argument('url', required=False, default=None)
        def run_scraper_command(url):
            """ Command to start the scraping process. """
            with self.app.app_context():
                scraper = Scraper()
                if not (url is None):
                    scraper.scrape_url(url)
                else:
                    scraper.scrape_by_id()
                self.logger.info(f"Scraping completed for {url}.")

    def __register_migrate(self):
        migrate = Migrate(self.app, db)

    def __register_cors(self):
        CORS(self.app)
        CORS(self.app, resources={r"/session/check-token": {"origins": "http://localhost:3000"}})

app_instance = App()
app = app_instance.app



