from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, String, Integer, JSON

puzzles_db = SQLAlchemy()


class SudokuPuzzle(puzzles_db.Model):
    __tablename__ = 'sudoku_puzzle'

    id = Column(Integer, primary_key=True)
    puzzle_image = Column(String)
    sudoku_pad_ref = Column(String)
    solution_code = Column(String)
    cells = Column(JSON)
    rules = Column(String)
    title = Column(String)
    author = Column(String)

