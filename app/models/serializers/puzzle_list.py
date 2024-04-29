from flask import Blueprint, jsonify
from app.models.puzzles import TablePuzzle

from flask import request

serializer = Blueprint('serializer', __name__)


@serializer.route('/puzzle-list')
def puzzle_list():
    page = request.args.get('page', 1, type=int)
    limit = 5
    offset = (page - 1) * limit
    puzzles = TablePuzzle.query.offset(offset).limit(limit).all()
    return jsonify([serialize(puzzle) for puzzle in puzzles])

def serialize(self):
    return {
        "id": self.id,
        "title": self.title,
        "author": self.author,
        "difficulty": self.difficulty,
        "mode": "non-standard" 
    }
