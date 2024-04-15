from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.firefox.options import Options

from time import sleep

class SudokupadScraper:

    soup = None
    binary_location = '/snap/firefox/current/usr/lib/firefox/firefox'

    def __init__(self): pass

    def scrape_url(self, url):

        web_driver = self.__setup_web_driver()

        web_driver.get(url)
        sleep(1)

        html = web_driver.page_source

        web_driver.quit()

        self.soup = BeautifulSoup(html, 'html.parser')
        
        return {
            'sudoku_size' : self.__get_sudoku_size(),
            'given_cells': self.__get_given_cells(),
            'rules'  : self.__get_rules(),
            'title'  : self.__get_title(),
            'author' : self.__get_author()
        }

    def __setup_web_driver(self):

        options = Options()
        options.add_argument("--headless")
        options.binary_location = self.binary_location
        options.profile = webdriver.FirefoxProfile()

        gecko_driver_manager = GeckoDriverManager()
        gecko_driver = gecko_driver_manager.install()

        service = FirefoxService(gecko_driver)

        web_driver = webdriver.Firefox(
            service=service,
            options=options
            )

        return web_driver

    def __get_rules(self) -> str():

        return self.soup.find('div', class_='puzzle-rules selectable').text

    def __get_title(self) -> str():

        return self.soup.find('div', class_='puzzle-title').text

    def __get_author(self) -> str():

        author = self.soup.find('div', class_='puzzle-author').text
        if author is not None:
            author = author.replace('\xa0by', '') if '\xa0by' in author else author
            author = author[1:] if author[0] == ' ' else author
        else: author = 'unknown'

        return author

    def __get_given_cells(self) -> str():

        cell_size = self.__get_cell_size()

        cell_givens = self.soup.find('g', id='cell-givens')
        if not cell_givens:
            return []

        givens = []
        for text in cell_givens.find_all('text', class_='cell-given'):
            digit = text.get_text(strip=True)
            x = float(text['x'])
            y = float(text['y'])

            column = int(x // cell_size) + 1
            row = int(y // cell_size) + 1

            givens.append({
                    'row': row, 
                    'column': column, 
                    'digit': digit
                })

        return givens

    def __get_cell_size(self):

        svg_container = self.soup.find('svg', class_='boardsvg')
        if not svg_container:
            return []

        style = svg_container.get('style', '')
        width = height = None
        if "width" in style:
            width = int(style.split('width:')[1].split('px')[0].strip())
        if "height" in style:
            height = int(style.split('height:')[1].split('px')[0].strip())

        width = width or 608
        height = height or 608

        sudoku_size = self.__get_sudoku_size()
        sudoku_size = sudoku_size[1] if sudoku_size is not None else 9

        cell_size = width / sudoku_size

        return cell_size

    def __get_sudoku_size(self) -> tuple():

        grid = self.soup.find('div', class_='grid')
        if not grid:
            return None

        rows = grid.find_all('div', class_='row')
        num_rows = len(rows)
        
        cells_in_row = rows[0].find_all('div', class_='cell')
        num_columns = len(cells_in_row) if rows else 0

        return (num_rows, num_columns)

