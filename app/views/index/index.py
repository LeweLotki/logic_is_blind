from flask import Blueprint, send_from_directory, current_app, request, make_response
import os
import uuid
from datetime import datetime

from app.models.session import Session  # Import the Session model
from app.models import db  # Ensure the db is imported from your models

index = Blueprint('index', __name__)

@index.route('/')
def home():
    build_dir = os.path.join(current_app.root_path, '..', 'frontend', 'build')
    user_id = request.cookies.get('user_id')
    
    if not user_id:
        # Create new user ID and session
        new_session = Session(user_id=str(uuid.uuid4()))
        db.session.add(new_session)
        db.session.commit()

        # Create a response and set the cookie
        response = make_response(send_from_directory(build_dir, 'index.html'))
        response.set_cookie('user_id', new_session.user_id, max_age=60*60*24*30)  # Expires in 30 days
        return response
    else:
        # Update the last login time
        session = Session.query.filter_by(user_id=user_id).first()
        if session:
            session.last_login = datetime.utcnow()
            db.session.commit()
        # Serve the index.html as normal
        return send_from_directory(build_dir, 'index.html')

