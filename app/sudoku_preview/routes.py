from flask import Blueprint, request, render_template
import requests
from bs4 import BeautifulSoup

sudoku_preview = Blueprint('sudoku_preview', __name__)

@sudoku_preview.route('/fetch-image', methods=['POST'])
def fetch_image():
    url = request.form['url']
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    image_src = soup.find('img')['src']
    if not image_src.startswith(('http:', 'https:')):
        base_url = '/'.join(url.split('/')[:3])
        image_src = base_url + image_src
    return render_template('sudoku_preview.html', image_src=image_src)

