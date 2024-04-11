import requests
from bs4 import BeautifulSoup


class LogicMasterScraper:

    soup = None

    def __init__(self): pass

    def scrape_url(self, url):

        response = requests.get(url)
        self.soup = BeautifulSoup(response.text, 'html.parser')

        return {
            'puzzle_image'   : self.__get_puzzle_image(),
            'sudoku_pad_ref' : self.__get_sudoku_pad_ref(),
            'difficulty'     : self.__get_difficulty(),
            'solution_code'  : self.__get_solution_code() 
        }

    def __get_puzzle_image(self) -> str():

        return self.soup.find('img')['src']

    def __get_sudoku_pad_ref(self) -> str():

        sudoku_pad_ref = None
        sudoku_pad_ref_tag = self.soup.find('a', href=lambda href: href and 'crackingthecryptic' in href)
        if sudoku_pad_ref_tag:
            sudoku_pad_ref = sudoku_pad_ref_tag['href']
        return sudoku_pad_ref

    def __get_difficulty(self) -> str():

        difficulty_row = self.soup.find(lambda tag: tag.name == 'td' and 'Schwierigkeit' in tag.get_text())
        difficulty = None
        if difficulty_row:
            difficulty = difficulty_row.find('img').get('title')
        return difficulty

    def __get_solution_code(self) -> str():

        return self.soup.find('span', class_='rp_loesungscode_descr').text


