from flask import Blueprint, jsonify, request
# from app.models.puzzles import PuzzleTable
from app.models.session import Session


set_digit = Blueprint('set_digit', __name__)


@set_digit.route('/set-digit', methods=['POST'])
def get_value():

    row = request.json.get('row')
    column = request.json.get('column')
    value = request.json.get('value')

    token = request.json.get('token')
    puzzle_id = request.json.get('puzzle_id')

    session_exists = Session.query.filter_by(user_id=token).first() is not None

    return jsonify({'exist': session_exists})

