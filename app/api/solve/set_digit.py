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
    digit_out_of_range = is_digit_out_of_range(row=row, column=column, puzzle_id=puzzle_id)
    if (not session_exists) or digit_given or digit_out_of_range: 
        return jsonify({
            'exist': session_exists,
            'digit_given': digit_given,
            'puzzle_solved': False,
            'out_of_range': digit_out_of_range,
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

    puzzle_solved = is_puzzle_solved(puzzle_id=puzzle_id, user_id=token) 
    return jsonify({
            'exist': True,
            'digit_given': False,
            'puzzle_solved': puzzle_solved,
            'out_of_range': False,
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

    puzzle = TablePuzzle.query.filter(TablePuzzle.id == puzzle_id).first()

    user_inputs = TableSolve.query\
                    .filter(TableSolve.user_id == user_id)\
                    .filter(TableSolve.puzzle_id == puzzle_id)\
                    .all()

    given_cells = puzzle.cells
    given_cells = [(given_cell['row'], given_cell['column']) for given_cell in given_cells]
   
    user_inputs = [(user_input.row, user_input.column) for user_input in user_inputs]

    all_inputs = [*given_cells, *user_inputs]
    size = puzzle.size

    return check_all_combinations(size, all_inputs)


def is_digit_out_of_range(row: int, column: int, puzzle_id: int) -> bool:

    puzzle = TablePuzzle.query.filter(TablePuzzle.id == puzzle_id).first()
    size = puzzle.size

    if int(row) > int(size) or int(column) > int(size):
        return True

    return False 


def check_all_combinations(n, tuples_list) -> bool:
    tuples_set = set(tuples_list)

    for x in range(1, n + 1):
        for y in range(1, n + 1):
            required_tuple = (x, y)
            if required_tuple not in tuples_set:
                return False

    return True


  
