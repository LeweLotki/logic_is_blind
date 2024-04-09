import requests
from bs4 import BeautifulSoup

def scrape_logic_master(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    puzzle_image = soup.find('img')['src']
    sudoku_pad_ref = soup.find('a', href=True)['href']
    solution_code = soup.find('span', class_='rp_loesungscode').text

    return {
        'puzzle_image': puzzle_image,
        'sudoku_pad_ref': sudoku_pad_ref,
        'solution_code': solution_code
    }

def scrape_sudokupad(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    cells = [{...}]  # Extract cells using their class and parse into a dictionary.
    rules = soup.find('div', class_='puzzle-rules selectable').text
    title = soup.find('div', class_='puzzle-title').text
    author = soup.find('div', class_='puzzle-author').text

    return {
        'cells': cells,
        'rules': rules,
        'title': title,
        'author': author
    }


