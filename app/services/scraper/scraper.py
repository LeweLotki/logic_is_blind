import requests
from bs4 import BeautifulSoup

from logic_master_scraper import LogicMasterScraper


class PuzzleScraper:
    
    data = dict()
    soup = None

    def __init__(self):  

        self.logic_master_scraper = LogicMasterScraper()

    def scrape_url(self, url : str):
        
        logic_master_data = self.logic_master_scraper.scrape_url(url=url)

        if 'sudoku_pad_ref' in logic_master_data and logic_master_data['sudoku_pad_ref'] is not None:
            sudoku_pad_data = self.__scrape_sudokupad(logic_master_data['sudoku_pad_ref'])
            self.data = logic_master_data.update(sudoku_pad_data)

        self.data = logic_master_data
        print(self.data)

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

    scraper = PuzzleScraper()
    url = 'https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000HGQ'
    scraper.scrape_url(url=url)

