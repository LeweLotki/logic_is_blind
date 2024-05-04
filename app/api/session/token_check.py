from flask import Blueprint, jsonify, request
from app.models.session import Session


token_check = Blueprint('token_check', __name__)


@token_check.route('/check-token', methods=['POST'])
def check_token():
    token = request.json.get('token')
    session_exists = Session.query.filter_by(user_id=token).first() is not None

    return jsonify({'exist': session_exists})

