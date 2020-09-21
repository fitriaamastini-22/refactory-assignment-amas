from app.model.user import Users
from app import response, app
from flask import request
from app import db
from flask_jwt_extended import *
import datetime

from app import mail
from flask_mail import Message
from flask import render_template

@jwt_required
def index():

    try:
        print(get_jwt_identity())
        user_token = get_jwt_identity()
        print(user_token)
        for key,value in user_token.items():
            print(f"{key} : {value}")


        users = Users.query.all()
        data = transform(users)
        return response.ok(data, "OKE DATA USER TAMPIL")
    except Exception as e:
        print(e)


def show(id):
    try:
        users = Users.query.filter_by(id=id).first()
        if not users:
            return response.badRequest([], 'Empty....')

        data = singleTransform(users,withBooking=False)
        return response.ok(data, "")
    except Exception as e:
        print(e)


def transform(users):
    array = []
    for i in users:
        array.append(singleTransform(i))
    return array

def singleTransform(users, withBooking=True):
    data = {
        'id': users.id,
        'name': users.name,
        'email': users.email,
        'role': users.role,
        'department': users.department
    }

    if withBooking:
        bookings = []
        for i in users.bookings:
            bookings.append({
                'id': i.id,
                'room_id': i.room_id,
                'booking_date': i.booking_date,
                'booking_time_start': i.booking_time_start,
                'booking_time_end': i.booking_time_end,
                'status': i.status,
            })
        data['bookings'] = bookings

    return data
#-----------------

def store():
    # try:
        name = request.json['name']
        email = request.json['email']
        password = request.json['password']
        role = request.json['role']
        department = request.json['department']

        users = Users(name=name, email=email, role=role, department=department)
        users.setPassword(password)
        db.session.add(users)
        db.session.commit()

        # msg = Message(f"Hello, {name} Selamat datang di Aplikasi Booking Ruang Rapat",
        #               sender="cahyo.add.qt@mail.com")
        # msg.add_recipient(email)
        # message_value = f"Hello {name}"
        # msg.html = render_template('index.html',message_key=message_value)

        # mail.send(msg)


        return response.ok('', 'Successfully create data!')

    # except Exception as e:
    #     print(e)

@jwt_required
def update(id):
    try:
        name = request.json['name']
        email = request.json['email']
        password = request.json['password']
        role = request.json['role']
        department = request.json['department']

        user = Users.query.filter_by(id=id).first()
        user.email = email
        user.name = name
        user.role = role
        user.department = department
        user.setPassword(password)

        db.session.commit()

        return response.ok('', 'Successfully update data!')

    except Exception as e:
        print(e)


def delete(id):
    try:
        user = Users.query.filter_by(id=id).first()
        if not user:
            return response.badRequest([], 'Empty....')

        db.session.delete(user)
        db.session.commit()

        return response.ok('', 'Successfully delete data!')
    except Exception as e:
        print(e)

def login():
    try:
        email = request.json['email']
        password = request.json['password']

        user = Users.query.filter_by(email=email).first()
        if not user:
            return response.badRequest([], 'Empty....')

        if not user.checkPassword(password):
            return response.badRequest([], 'Your credentials is invalid')

        data = singleTransform(user, withBooking=False)
        expires = datetime.timedelta(days=1)
        expires_refresh = datetime.timedelta(days=3)
        access_token = create_access_token(data, fresh=True, expires_delta=expires)
        refresh_token = create_refresh_token(data, expires_delta=expires_refresh)

        return response.ok({
            "data": data,
            "token_access": access_token,
            "token_refresh": refresh_token,
        }, "")

    except Exception as e:
        print(e)

@jwt_refresh_token_required
def refresh():
    # try:
        user = get_jwt_identity()
        new_token = create_access_token(identity=user, fresh=False)

        return response.ok({
            "token_access": new_token
        }, "")

    # except Exception as e:
    #     print(e)
