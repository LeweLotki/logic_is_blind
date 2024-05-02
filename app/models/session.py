from . import db  
import uuid
from datetime import datetime

class Session(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), unique=True, nullable=False)
    first_login = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, onupdate=datetime.utcnow, default=datetime.utcnow)

    def __repr__(self):
        return f'<Session {self.user_id}>'

