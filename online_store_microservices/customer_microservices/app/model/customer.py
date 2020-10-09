from app import db
from datetime import datetime

class Customers(db.Model):
    id           = db.Column(db.BigInteger,primary_key=True,autoincrement=True)
    full_name    = db.Column(db.String(100), nullable=False)
    username     = db.Column(db.String(20), unique=True, nullable=False)
    email        = db.Column(db.String(50), unique=True, nullable=False)
    phone_number = db.Column(db.Integer, nullable=True)
    gender       = db.Column(db.String(15), nullable=True)
    address      = db.Column(db.String(255), nullable=False)
    created_at   = db.Column(db.DateTime,default=datetime.utcnow)
    updated_at   = db.Column(db.DateTime,default=datetime.utcnow)

def __repr__(self):
        return '<Customer {}>'.format(self.username)