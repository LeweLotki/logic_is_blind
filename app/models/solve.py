from sqlalchemy import Column, String, Integer
from datetime import datetime
from . import db


class TableSolve(db.Model):

    __tablename__ = 'puzzle_solve'

    id = Column(Integer, primary_key=True)
    user_id = Column(String)
    puzzle_id = Column(Integer)
    row = Column(Integer)
    column = Column(Integer)
    value = Column(Integer)
    insert_time = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Row {self.row} Column {self.column} Value {self.value}>'

