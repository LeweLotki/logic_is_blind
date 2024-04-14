from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.firefox.options import Options

from time import sleep

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

        web_driver = self.__setup_web_driver()

        web_driver.get(url)
        sleep(5)

        html = web_driver.page_source

        web_driver.quit()

        soup = BeautifulSoup(html, 'html.parser')
        
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

    def __setup_web_driver(self):

        options = Options()
        options.add_argument("--headless")
        options.binary_location = '/snap/firefox/current/usr/lib/firefox/firefox'
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

        pass

    def __get_title(self) -> str():

        pass

    def __get_author(self) -> str():

        pass

    def __get_cells(self) -> str():

        pass


if __name__ == '__main__':

    scraper = PuzzleScraper()
    url = 'https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000HGQ'
    scraper.scrape_url(url=url)

