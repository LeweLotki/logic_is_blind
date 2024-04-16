from flask import Blueprint, request, render_template
import requests
from bs4 import BeautifulSoup

# from app.services.scraper.scraper import PuzzleScraper 

sudoku_preview = Blueprint('sudoku_preview', __name__)


class SudokuPreview:

    def __init__(self):

        self.image_src = ''

    def display(self):

        # scraper = PuzzleScraper()
        # url = 'https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000HGQ'
        # data = scraper.scrape_url(url=url)
        # self.image_src = data['puzzle_image']
      
        return render_template('sudoku_preview.html', image_src=self.image_src)



@sudoku_preview.route('/sudoku_preview', methods=['POST'])
def sudoku_preview_route():

    sp = SudokuPreview()
    return sp.display()

