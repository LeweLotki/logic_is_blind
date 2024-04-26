from flask import Flask
import click

from .views.index.index import index
from .views.sudoku_preview.sudoku_preview import sudoku_preview

from .models import db

from .services.scraper import Scraper


class App:

    app = Flask(__name__)
    
    def __init__(self, *args, **kwargs):
       
        self.__register_models()
        self.__register_blueprints()    
        self.__register_commands()

    def __call__(self, environ, start_response):
        return self.app(environ, start_response)

    def run(self, debug=True):

        self.app.run(debug=debug)

    def __register_blueprints(self):

        self.app.register_blueprint(index)
        self.app.register_blueprint(sudoku_preview)

    def __register_models(self):

        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sudoku.db'
        db.init_app(self.app)

        with self.app.app_context():
            db.create_all()

    def __register_commands(self):

        @self.app.cli.command("run-scraper")
        @click.argument('url')
        def run_scraper_command(url):
            """ Command to start the scraping process. """
            with self.app.app_context():
                scraper = Scraper()
                scraper.scrape_url(url)
                print(f"Scraping completed for {url}.")

app_instance = App()
app = app_instance.app

