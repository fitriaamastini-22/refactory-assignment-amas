from app.model.room import Rooms
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


        rooms = Rooms.query.all()
        data = transform(rooms)
        return response.ok(data, "OKE DATA ROOMS TAMPIL")
    except Exception as e:
        print(e)

@jwt_required
def show(id):
    try:
        rooms = Rooms.query.filter_by(id=id).first()
        if not rooms:
            return response.badRequest([], 'Empty....')

        data = singleTransform(rooms,withBooking=True)
        return response.ok(data, "")
    except Exception as e:
        print(e)


def transform(rooms):
    array = []
    for i in rooms:
        array.append(singleTransform(i))
    return array

def singleTransform(rooms, withBooking=True):
    data = {
        'id': rooms.id,
        'room': rooms.room,
        'location': rooms.location,
        'capacity': rooms.capacity
    }

    if withBooking:
        bookings = []
        for i in rooms.bookings:
            bookings.append({
                'id': i.id,
                'user_id': i.user_id,
                'booking_date': i.booking_date,
                'booking_time_start': i.booking_time_start,
                'booking_time_end': i.booking_time_end,
                'status': i.status,
            })
        data['bookings'] = bookings

    return data
#-----------------
@jwt_required
def store():
    # try:
        room = request.json['room']
        location = request.json['location']
        capacity = request.json['capacity']

        rooms = Rooms(room=room, location=location, capacity=capacity)
        db.session.add(rooms)
        db.session.commit()

        return response.ok('', 'Successfully create room!')

    # except Exception as e:
    #     print(e)

@jwt_required
def update(id):
    try:
        room = request.json['room']
        location = request.json['location']
        capacity = request.json['capacity']

        rooms = Rooms.query.filter_by(id=id).first()
        rooms.room = room
        rooms.location = location
        rooms.capacity = capacity

        db.session.commit()

        return response.ok('', 'Successfully update data!')

    except Exception as e:
        print(e)

@jwt_required
def delete(id):
    try:
        room = Rooms.query.filter_by(id=id).first()
        if not room:
            return response.badRequest([], 'Empty....')

        db.session.delete(room)
        db.session.commit()

        return response.ok('', 'Successfully delete data!')
    except Exception as e:
        print(e)
