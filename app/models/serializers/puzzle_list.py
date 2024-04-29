from flask import Blueprint, jsonify
from app.models.puzzles import TablePuzzle

serializer = Blueprint('serializer', __name__)


@serializer.route('/puzzle-list')
def puzzle_list():
    puzzles = TablePuzzle.query.all()
    number_of_puzzles_in_list = 5
    return jsonify([serialize(puzzle) for puzzle in puzzles[:number_of_puzzles_in_list]])


def serialize(self):
    return {
        "id": self.id,
        "title": self.title,
        "author": self.author,
        "difficulty": self.difficulty,
        "mode": "non-standard" 
    }
