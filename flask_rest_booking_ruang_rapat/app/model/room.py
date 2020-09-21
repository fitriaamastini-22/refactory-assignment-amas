from app import db
from datetime import datetime

class Rooms(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    room = db.Column(db.String(250), nullable=False)
    location = db.Column(db.String(250), nullable=False)
    capacity = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    bookings = db.relationship("Bookings",
                            lazy='select',
                            backref=db.backref('bookings_room', lazy='joined'))

    def __repr__(self):
        return '<Room {}>'.format(self.room)