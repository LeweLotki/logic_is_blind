import re
import requests
from selenium import webdriver
from bs4 import BeautifulSoup


class PuzzleScrapper:
    
    data = dict()

    def __init__(self): pass 

    def scrap_url(self, url : str):
        
        logic_master_data = self.__scrape_logic_master(url)
        if 'sudoku_pad_ref' in logic_master_data and logic_master_data['sudoku_pad_ref'] is not None:
            sudoku_pad_data = self.__scrape_sudokupad(logic_master_data['sudoku_pad_ref'])
            self.data = logic_master_data.update(sudoku_pad_data)
        self.data = logic_master_data
        print(self.data)

    def __scrape_logic_master(self, url):
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        puzzle_image = soup.find('img')['src']
        difficulty_row = soup.find('td', string=re.compile('Difficulty'))#.parent# if soup.find('td', string='Difficulty:') else None
        print(f'difficulty row: {difficulty_row}')
        difficulty = None
        if difficulty_row:
            difficulty = difficulty_row.find('img').get('title')

        # sudoku_pad_ref = soup.find('a', href=True)['href']
        solution_code = soup.find('span', class_='rp_loesungscode_descr').text

        return {
            'puzzle_image'   : puzzle_image,
            # 'sudoku_pad_ref' : sudoku_pad_ref,
            'difficulty'     : difficulty,
            'solution_code'  : solution_code
        }

    def __scrape_sudokupad(self, url):
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # given_cells = [{...}]  # Extract cells using their class and parse into a dictionary.
        rules = soup.find('div', class_='puzzle-rules selectable').text
        title = soup.find('div', class_='puzzle-title').text
        author = soup.find('div', class_='puzzle-author').text

        return {
            # 'given_cells': cells,
            'rules'  : rules,
            'title'  : title,
            'author' : author
        }


if __name__ == '__main__':

    scrapper = PuzzleScrapper()
    url = 'https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000HGQ'
    scrapper.scrap_url(url=url)

