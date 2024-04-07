from flask import Flask, render_template, request, redirect
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/fetch-image', methods=['POST'])
def fetch_image():
    url = request.form['url']
    # Fetch the page
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    # Extract the image URL
    image_src = soup.find('img')['src']
    # Assuming the image source is relative, concatenate with the base URL
    if not image_src.startswith(('http:', 'https:')):
        base_url = '/'.join(url.split('/')[:3])
        image_src = base_url + image_src
    return render_template('show_image.html', image_src=image_src)

if __name__ == '__main__':
    app.run(debug=True)

