import requests
import random
import logging
import string
from urllib.parse import urljoin
from bs4 import BeautifulSoup

from app.services.scraper.logic_master_scraper import LogicMasterScraper
from app.services.scraper.sudokupad_scraper import SudokupadScraper

from app.models import db
from app.models.urls import TableURL
from app.models.puzzles import TablePuzzle


class Scraper:
    '''This class is called by flask command to initialize scraper service'''    
    
    logic_master_base_url = 'https://logic-masters.de/Raetselportal/Raetsel/zeigen.php'

    def __init__(self):  
        '''Initializing particular scrapers constructors'''

        logging.basicConfig(filename='services.log', level=logging.INFO)
        self.logger = logging.getLogger(__name__)
        self.logic_master_scraper = LogicMasterScraper()
        self.sudokupad_scraper = SudokupadScraper()

    def scrape_url(self, url: str):
        '''
        This is main method of class, it works as follow:
            -> scrape all urls from given url and save them to db
            -> iterate through urls in db and scrape all significant data from them
            -> save collected data to db and change flag scraped if scraped succesfully
        '''
        self.__collect_urls(base_url=url)
        urls_to_scrape = TableURL.query.filter_by(scraped=False).all()
        for url_entry in urls_to_scrape:

            try:
                data = self.__collect_sudoku_data(url=url_entry.url)
                if data:
                    is_data_complete = self.__commit_collected_data(data)
                    if is_data_complete:
                        url_entry.scraped = True
                        self.logger.info(f'Succesfully scraped: {url_entry}')
                    db.session.commit()

            except Exception as e:
                self.logger.error(f"Error scraping {url_entry.url}: {e}")
                db.session.rollback()

    def scrape_by_id(self):
        '''
        If there is no url given, method 
        generate new url from random id.
        Then scrape it and save data to db.
        Do it in the loop.
        '''

        number_of_urls_to_scrape = 100
        for i in range(number_of_urls_to_scrape):

            is_url_in_db = False
            while not is_url_in_db:

                new_url = self.__generate_new_url()
                if not TableURL.query.filter_by(url=new_url).first():

                    self.logger.info(f'New url generated: {new_url}')
                    new_url = TableURL(url=new_url, scraped=False)
                    db.session.add(new_url)
                    is_url_in_db = True
                    db.session.commit()

        urls_to_scrape = TableURL.query.filter_by(scraped=False).all()
        for url_entry in urls_to_scrape:

            try:
                data = self.__collect_sudoku_data(url=url_entry.url)
                if data:
                    is_data_complete = self.__commit_collected_data(data)
                    if is_data_complete:
                        url_entry.scraped = True
                        self.logger.info(f'Succesfully scraped: {url_entry}')
                    db.session.commit()

            except Exception as e:
                self.logger.error(f"Error scraping {url_entry.url}: {e}")
                db.session.rollback()

            self.__translate_difficulty()

    def __generate_new_url(self):

        second_part_characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        characters = string.ascii_letters + string.digits
        end_characters = ''.join(random.choice(characters) for _ in range(2))
        random_id = '000' + random.choice(second_part_characters) + end_characters

        url = f'{self.logic_master_base_url}?id={random_id}'

        return url

    def __collect_urls(self, base_url: str) -> None:
        '''This method collect all urls from given base_url and save them to db'''

        response = requests.get(base_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        links = soup.find_all('a')        
        for link in links:
            url = urljoin(base_url, link['href'])
            if not TableURL.query.filter_by(url=url).first():
                new_url = TableURL(url=url, scraped=False)
                db.session.add(new_url)

        db.session.commit()

    def __collect_sudoku_data(self, url: str) -> dict:
        '''This method collect data scraped from given url from db'''

        logic_master_data = self.logic_master_scraper.scrape_url(url=url)

        if 'sudoku_pad_ref' in logic_master_data and logic_master_data['sudoku_pad_ref'] is not None:
            sudoku_pad_data = self.sudokupad_scraper.scrape_url(logic_master_data['sudoku_pad_ref'])
            self.data = logic_master_data.update(sudoku_pad_data)
        
        return logic_master_data

    def __commit_collected_data(self, data: dict) -> bool:
        '''
        This method commits collected data to db if not defective.
        Return True if data complete, return False if data defective.
        '''

        required_fields = [
            'puzzle_image', 
            'logic_master_ref', 
            'sudoku_pad_ref',
            'solution_code', 
            'rules', 
            'title', 
            'author',
            'sudoku_size'
        ]

        if all(data.get(field) is not None for field in required_fields):

            new_puzzle = TablePuzzle(
                puzzle_image=data['puzzle_image'],
                logic_master_url=data['logic_master_ref'],
                sudoku_pad_ref=data['sudoku_pad_ref'],
                solution_code=data['solution_code'],
                cells=data['given_cells'],
                rules=data['rules'],
                title=data['title'],
                author=data['author'],
                difficulty=data['difficulty'],
                standard=False,
                size=data['sudoku_size']
            )
            db.session.add(new_puzzle)
            
            return True

        else: 
            return False

    def __translate_difficulty(self):

        difficulty_dict = {
            "sehr leichtes": "very easy",
            "leichtes": "easy",
            "mittelschweres": "medium",
            "schweres": "hard",
            "sehr schweres": "very hard"
        }

        puzzles_to_translate = TablePuzzle.query.all()
        for puzzle_to_translate in puzzles_to_translate:
            try:
                for key, value in difficulty_dict.items():
                    if key in puzzle_to_translate.difficulty and 'sehr' in key:
                        puzzle_to_translate.difficulty = value
                    elif key in puzzle_to_translate.difficulty:
                        puzzle_to_translate.difficulty = value

                self.logger.info(f'Succesfully translated puzzle {puzzle_to_translate.title}')
                db.session.commit()

            except Exception as e:
                self.logger.error(f'Error while translating difficulty: {e}')
                db.session.rollback()


