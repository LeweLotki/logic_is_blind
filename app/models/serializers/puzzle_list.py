from flask import Blueprint, jsonify
from app.models.puzzles import TablePuzzle

from flask import request

puzzle_list_serializer = Blueprint('puzzle_list_serializer', __name__)


@puzzle_list_serializer.route('/puzzle-list')
def puzzle_list():
    page = request.args.get('page', 1, type=int)
    difficulty = request.args.get('difficulty', type=str)
    limit = 5
    offset = (page - 1) * limit

    query = TablePuzzle.query
    if difficulty:
        query = query.filter(TablePuzzle.difficulty == difficulty)

    puzzles = query.offset(offset).limit(limit).all()
    return jsonify([serialize(puzzle) for puzzle in puzzles])


def serialize(self):
    return {
        "id": self.id,
        "title": self.title,
        "author": self.author,
        "difficulty": self.difficulty,
        "image": self.puzzle_image,
        "mode": "non-standard" 
    }
