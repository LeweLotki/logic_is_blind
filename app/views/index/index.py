from flask import Blueprint, send_from_directory, current_app, request, make_response
import os

from app.models.session import Session, generate_user_id  # Import the Session model and the ID generator
from app.models import db

from datetime import datetime

index = Blueprint('index', __name__)

@index.route('/')
def home():
    build_dir = os.path.join(current_app.root_path, '..', 'frontend', 'build')
    user_id = request.cookies.get('user_id')
    
    if not user_id:
        # Create new user ID and session
        new_user_id = generate_user_id()
        new_session = Session(user_id=new_user_id)
        db.session.add(new_session)
        db.session.commit()

        # Create a response and set the cookie
        response = make_response(send_from_directory(build_dir, 'index.html'))
        response.set_cookie('user_id', new_user_id, max_age=60*60*24*30)  # Expires in 30 days
        return response
    else:
        # Validate existing user ID and update last login
        session = Session.query.filter_by(user_id=user_id).first()
        if session:
            session.last_login = datetime.utcnow()
            db.session.commit()
            return send_from_directory(build_dir, 'index.html')
        else:
            # Handle cases where the cookie is invalid (e.g., tampered or user not found)
            response = make_response("Invalid session. Please refresh to obtain a new user ID.")
            response.delete_cookie('user_id')
            return response

