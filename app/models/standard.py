from sqlalchemy import Column, String, Integer, JSON
from . import db


class TableStandard(db.Model):

    __tablename__ = 'standard'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    grid = Column(JSON)
    solution = Column(JSON)
