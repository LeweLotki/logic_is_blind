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
        
        # given_cells = [{...}]  # Extract cells using their class and parse into a dictionary.
                        
        return {
            # 'given_cells': cells,
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

        return self.soup.find('div', class_='puzzle-author').text

    def __get_cells(self) -> str():

        pass



