from app import db
from datetime import datetime
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash


class Users(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String(230), nullable=False)
    role = db.Column(db.String(230), nullable=False)
    department = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    bookings = db.relationship("Bookings",
                            lazy='select',
                            backref=db.backref('bookings_user', lazy='joined'))

    def __repr__(self):
        return '<User {}>'.format(self.name)

    def setPassword(self, password):
        self.password = generate_password_hash(password)

    def checkPassword(self, password):
        return check_password_hash(self.password, password)