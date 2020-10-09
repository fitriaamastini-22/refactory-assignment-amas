from app import db
from datetime import datetime

class Merchants(db.Model):
    id           = db.Column(db.BigInteger,primary_key=True,autoincrement=True)
    name         = db.Column(db.String(100), nullable=False)
    image        = db.Column(db.String(255), nullable=False)
    address      = db.Column(db.String(255), nullable=False)
    rating       = db.Column(db.Numeric(5,2), nullable=True)
    num_rate     = db.Column(db.Integer, nullable=True)
    created_at   = db.Column(db.DateTime,default=datetime.utcnow)
    updated_at   = db.Column(db.DateTime,default=datetime.utcnow)

def __repr__(self):
        return '<Merchant {}>'.format(self.name)