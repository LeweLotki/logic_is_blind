from . import db
import random
import string
from datetime import datetime
import uuid

def generate_user_id(length=8):
    """Generate a random alphanumeric ID."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

class Session(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(8), unique=True, nullable=False, default=generate_user_id)
    first_login = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, onupdate=datetime.utcnow, default=datetime.utcnow)

    def __repr__(self):
        return f'<Session {self.user_id}>'

