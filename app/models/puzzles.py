from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, JSON, Boolean

puzzles_db = SQLAlchemy()


class SudokuPuzzle(puzzles_db.Model):

    __tablename__ = 'sudoku_puzzle'

    id = Column(Integer, primary_key=True)
    puzzle_image = Column(String)
    logic_master_url = Column(String, unique=True)
    sudoku_pad_ref = Column(String)
    solution_code = Column(String)
    cells = Column(JSON)
    rules = Column(String)
    title = Column(String, index=True)
    author = Column(String)
    difficulty = Column(String)
    scraped = Column(Boolean, default=False)
