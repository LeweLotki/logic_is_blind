from sqlalchemy import Column, String, Integer, JSON, Boolean
from . import db


class TablePuzzle(db.Model):

    __tablename__ = 'sudoku_puzzle'

    id = Column(Integer, primary_key=True)
    puzzle_image = Column(String)
    logic_master_url = Column(String)
    sudoku_pad_ref = Column(String)
    solution_code = Column(String)
    cells = Column(JSON)
    rules = Column(String)
    title = Column(String, index=True)
    author = Column(String)
    difficulty = Column(String)
    size = Column(Integer, default=9)
    standard = Column(Boolean)
