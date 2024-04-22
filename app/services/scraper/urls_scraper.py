import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from app.models import db
from app.models.urls import TableURL


class ScraperURL:

    def collect_urls(self, url: str) -> None:

        response = requests.get(self.base_url)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        links = soup.find_all('a')        
        for link in links:
            url = urljoin(self.base_url, link['href'])
            if not TableURL.query.filter_by(url=url).first():
                new_url = TableURL(url=url, scraped=False)
                db.session.add(new_url)

        db.session.commit()

