from flask import Flask
from flask_migrate import Migrate

import click
import logging

from .views.index.index import index

from .models import db

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

    def __call__(self, environ, start_response):
        return self.app(environ, start_response)

    def run(self, debug=True):

        self.app.run(debug=debug)

    def __register_blueprints(self):

        self.app.register_blueprint(index)

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

app_instance = App()
app = app_instance.app



