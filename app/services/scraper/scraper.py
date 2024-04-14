from logic_master_scraper import LogicMasterScraper
from sudokupad_scraper import SudokupadScraper

class PuzzleScraper:
    
    data = dict()
    soup = None

    def __init__(self):  

        self.logic_master_scraper = LogicMasterScraper()
        self.sudokupad_scraper = SudokupadScraper()

    def scrape_url(self, url : str):
        
        logic_master_data = self.logic_master_scraper.scrape_url(url=url)

        if 'sudoku_pad_ref' in logic_master_data and logic_master_data['sudoku_pad_ref'] is not None:
            sudoku_pad_data = self.sudokupad_scraper.scrape_url(logic_master_data['sudoku_pad_ref'])
            self.data = logic_master_data.update(sudoku_pad_data)

        self.data = logic_master_data
        print(self.data)

if __name__ == '__main__':

    scraper = PuzzleScraper()
    url = 'https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000HP3'
    # url = 'https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000HGQ'
    scraper.scrape_url(url=url)

