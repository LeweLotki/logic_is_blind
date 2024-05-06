from flask import Blueprint, jsonify, request
from app.models.solve import TableSolve
from app.models.puzzles import TablePuzzle
from app.models.session import Session


get_solution = Blueprint('get_solution', __name__)


@get_solution.route('/get-solution', methods=['GET'])
def get_value():

    token = request.args.get('token')
    puzzle_id = request.args.get('puzzle_id')

    session_exists = Session.query.filter_by(user_id=token).first() is not None
    if not session_exists: 
        return None

    return jsonify({
            'cells': get_filled_cells(puzzle_id=puzzle_id, user_id=token)
            })


def get_filled_cells(puzzle_id, user_id) -> list:

    puzzle = TablePuzzle.query.filter(TablePuzzle.id == puzzle_id).first()

    user_inputs = TableSolve.query\
                    .filter(TableSolve.user_id == user_id)\
                    .filter(TableSolve.puzzle_id == puzzle_id)\
                    .all()

    given_cells = puzzle.cells
    given_cells = [(given_cell['row'], given_cell['column'], given_cell['digit']) for given_cell in given_cells]
   
    user_inputs = [(user_input.row, user_input.column, user_input.value) for user_input in user_inputs]

    all_inputs = [*given_cells, *user_inputs]
    size = puzzle.size

    matrix = [[0] * size for _ in range(size)]
    
    for row, col, value in all_inputs:
        matrix[row - 1][col - 1] = value
    
    return matrix

