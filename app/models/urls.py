from sqlalchemy import Column, String, Integer, Boolean
from . import db


class TableURL(db.Model):

    __tablename__ = 'urls'

    id = Column(Integer, primary_key=True)
    url = Column(String, unique=True)
    scraped = Column(Boolean, default=False)

