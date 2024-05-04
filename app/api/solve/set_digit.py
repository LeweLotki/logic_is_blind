from flask import Blueprint, jsonify, request
from app.models.solve import TableSolve
from app.models.puzzles import TablePuzzle
from app.models.session import Session

from app.models import db

set_digit = Blueprint('set_digit', __name__)


@set_digit.route('/set-digit', methods=['POST'])
def get_value():

    row = request.json.get('row')
    column = request.json.get('column')
    value = request.json.get('value')

    token = request.json.get('token')
    puzzle_id = request.json.get('puzzle_id')

    session_exists = Session.query.filter_by(user_id=token).first() is not None
    digit_given = is_digit_given(row=row, column=column, puzzle_id=puzzle_id)    
    if (not session_exists) or digit_given: 
        return jsonify({
            'exist': session_exists,
            'digit_given': digit_given,
            'puzzle_solved': False,
            'out_of_range': False
            })

    new_inserted_value = TableSolve(
        user_id=token,
        puzzle_id=int(puzzle_id),
        row=int(row),
        column=int(column),
        value=int(value)
    )
    db.session.add(new_inserted_value)
    db.session.commit()

    return jsonify({
            'exist': session_exists,
            'digit_given': is_digit_given(row=row, column=column, puzzle_id=puzzle_id),
            'puzzle_solved': False,
            'out_of_range': False
            })


def is_digit_given(row: int, column: int, puzzle_id: int) -> bool:

    puzzle = TablePuzzle.query.filter(TablePuzzle.id == puzzle_id).first()
    given_cells = puzzle.cells
    if given_cells is None:
        return False 

    for given_cell in given_cells:
        if int(given_cell['row']) == int(row) and int(given_cell['column']) == int(column):
            return True

    return False 


def is_puzzle_solved(puzzle_id, user_id) -> bool:

    pass


def is_digit_out_of_range(row: int, column: int, value: int, puzzle_id: int) -> bool:

    pass

