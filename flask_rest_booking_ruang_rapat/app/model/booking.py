from app import db
from datetime import datetime
from app.model.user import Users
from app.model.room import Rooms

class Bookings(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    room_id = db.Column(db.BigInteger, db.ForeignKey(Rooms.id))
    rooms = db.relationship("Rooms", backref="room_id")
    user_id = db.Column(db.BigInteger, db.ForeignKey(Users.id))
    users = db.relationship("Users", backref="user_id")

    booking_date = db.Column(db.Date, nullable=False)
    booking_time_start = db.Column(db.Time, nullable=False)
    booking_time_end = db.Column(db.Time, nullable=False)
    extra_information = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(250), nullable=False) #reserved #finished #cancel

    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Booking {}>'.format(self.id)