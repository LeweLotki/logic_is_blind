import requests
from bs4 import BeautifulSoup


class PuzzleScrapper:
    
    data = dict()
    soup = None

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

