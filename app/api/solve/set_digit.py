from flask import Blueprint, jsonify, request
from app.models.solve import TableSolve
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
    if not session_exists: 
        return jsonify({'exist': session_exists})
       
    new_inserted_value = TableSolve(
        user_id=token,
        puzzle_id=int(puzzle_id),
        row=int(row),
        column=int(column),
        value=int(value)
    )
    db.session.add(new_inserted_value)
    db.session.commit()

    return jsonify({'exist': session_exists})

