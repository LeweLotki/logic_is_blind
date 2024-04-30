from flask import Blueprint, jsonify
from app.models.puzzles import TablePuzzle

from flask import request

pop_up_serializer = Blueprint('pop_up_serializer', __name__)


@pop_up_serializer.route('/pop-up')
def pop_up():
    puzzle_id = request.args.get('id', 1, type=int)

    query = TablePuzzle.query
    query = query.filter(TablePuzzle.id == puzzle_id)

    puzzles = query.all()
    return jsonify([serialize(puzzle) for puzzle in puzzles])


def serialize(self):
    return {
        "id": self.id,
        "rules": self.rules
    }
