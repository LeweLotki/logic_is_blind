from flask import Blueprint, jsonify
from app.models.puzzles import TablePuzzle

serializer = Blueprint('serializer', __name__)


@serializer.route('/puzzle-list')
def puzzle_list():
    puzzles = TablePuzzle.query.all()
    return jsonify([puzzle.serialize() for puzzle in puzzles])


def serialize(self):
    return {
        "id": self.id,
        "title": self.name,
        "author": self.author,
        "difficulty": self.difficulty,
        "mode": "non-standard" 
    }
