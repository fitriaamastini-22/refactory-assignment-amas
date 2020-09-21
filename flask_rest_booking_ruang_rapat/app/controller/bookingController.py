from app.model.room import Rooms
from app.model.user import Users
from app.model.booking import Bookings
from app import response, app
from flask import request
from app import db
from flask_jwt_extended import *
import datetime
import time

from app import mail
from flask_mail import Message
from flask import render_template
from pprint import pprint

@jwt_required
def index():
    try:
        print(get_jwt_identity())
        user_token = get_jwt_identity()
        print(user_token)
        for key,value in user_token.items():
            print(f"{key} : {value}")

        if user_token['role'] == 'admin':
            bookings = Bookings.query.all()
        else:
            bookings = Bookings.query.filter_by(user_id=user_token['id']).all()

        data = transform(bookings)
        # pprint(data)
        data = ParseDateAndTimeBookingToString(data)
        # pprint(data)
        return response.ok(data, "OKE DATA BOOKINGS TAMPIL")
    except Exception as e:
        print(e)

@jwt_required
def show(id):
    try:
        user_token = get_jwt_identity()
        if user_token["role"] != "admin":
        	bookings = Bookings.query.filter_by(id=id, user_id=user_token['id']).first()
        else:
        	bookings = Bookings.query.filter_by(id=id).first()

        if not bookings:
            return response.badRequest([], 'Empty....')

        data = singleTransform(bookings,withUser=True,withRoom=True)
        # pprint(data)
        data = ParseDateAndTimeBookingToString(data)
        # pprint(data)
        return response.ok(data, "")
    except Exception as e:
        print(e)

def ParseDateAndTimeBookingToString(bookings):
	print( type(bookings) )
	if type(bookings) == list:
		counter = int(len(bookings))
		for i in range(counter):
			bookings[i]['bookings_date'] = bookings[i]['bookings_date'].strftime('%Y-%m-%d')
			bookings[i]['booking_time_start'] = bookings[i]['booking_time_start'].strftime("%H:%M")
			bookings[i]['booking_time_end']  = bookings[i]['booking_time_end'].strftime("%H:%M")
		return bookings
	else:
		bookings['bookings_date'] = bookings['bookings_date'].strftime('%Y-%m-%d')
		bookings['booking_time_start'] = bookings['booking_time_start'].strftime("%H:%M")
		bookings['booking_time_end'] = bookings['booking_time_end'].strftime("%H:%M")
		return bookings

def transform(bookings, withUser=True,withRoom=True):
    array = []
    for i in bookings:
    	array.append(singleTransform(i, withUser=withUser, withRoom=withRoom))
    return array

def singleTransform(bookings, withUser=True,withRoom=True):
    # pprint(bookings)
    data = {
        'id': bookings.id,
        'bookings_date': bookings.booking_date,
        'booking_time_start': bookings.booking_time_start,
        'booking_time_end': bookings.booking_time_end,
        'extra_information': bookings.extra_information,
        'status': bookings.status
	}

    if withUser:
        # pprint(bookings.users)
        user = {
                'user_id': bookings.users.id,
                'name': bookings.users.name,
                'email': bookings.users.email,
                'role': bookings.users.role,
                'department': bookings.users.department,
            }

        data['user'] = user

    if withRoom:
        # pprint(bookings.rooms)
        room = {
                'room_id': bookings.rooms.id,
                'room': bookings.rooms.room,
                'location': bookings.rooms.location,
            }
        data['room'] = room

    return data
#-----------------
@jwt_required
def store():
    # try:
    user_token = get_jwt_identity()
    room_id = request.json['room_id']

    if user_token['role'] == 'admin':
        if 'user_id' in request.json:
            user_id = request.json['user_id']
        else:
            user_id = user_token['id']
    else:
        user_id = user_token['id']

    booking_date = datetime.datetime.strptime(request.json['booking_date'], '%Y-%m-%d').date()
    booking_time_start = time.strptime(request.json['booking_time_start'], '%H:%M')
    booking_time_end = time.strptime(request.json['booking_time_end'], '%H:%M')
    if ( booking_time_start > booking_time_end):
    	booking_time_start, booking_time_end = booking_time_end, booking_time_start
    extra_information = request.json['extra_information']
    # status = request.json['status']
    status = "reserved"

    check_bookings = Bookings.query.filter_by(room_id=room_id, booking_date=booking_date, status="reserved").all()

    data_check_bookings = transform(check_bookings, withUser=False,withRoom=False)

    for data_check_booking in data_check_bookings:
        if (is_time_between(data_check_booking['booking_time_start'], data_check_booking['booking_time_end'], check_time=booking_time_start) or 
                is_time_between(data_check_booking['booking_time_start'], data_check_booking['booking_time_end'], check_time=booking_time_end)):
            return response.ok('Error', 'Anda tidak dapat mem-booking karena sudah ada yang melakukan booking terlebih dahulu')

        if (is_time_between2(booking_time_start, booking_time_end, check_time=data_check_booking['booking_time_start']) or 
                is_time_between2(booking_time_start, booking_time_end, check_time=data_check_booking['booking_time_end'])):
            return response.ok('Error', 'Anda tidak dapat mem-booking karena terjadi bentrok dengan booking sebelumnya')

    bookings = Bookings(room_id=room_id, user_id=user_id, booking_date=booking_date, 
        booking_time_start=booking_time_start, booking_time_end=booking_time_end,
        extra_information=extra_information, status=status)
    db.session.add(bookings)
    db.session.commit()

    return response.ok('', 'Successfully create booking!')

    # except Exception as e:
    #     print(e)

@jwt_required
def update(id):
    try:
        user_token = get_jwt_identity()
        room_id = request.json['room_id']

        if user_token['role'] == 'admin':
            if 'user_id' in request.json:
                user_id = request.json['user_id']
            else:
            	user_id = user_token['id']
        else:
            user_id = user_token['id']

        booking_date = datetime.datetime.strptime(request.json['booking_date'], '%Y-%m-%d').date()
        booking_time_start = time.strptime(request.json['booking_time_start'], '%H:%M')
        booking_time_end = time.strptime(request.json['booking_time_end'], '%H:%M')
        if ( booking_time_start > booking_time_end):
        	booking_time_start, booking_time_end = booking_time_end, booking_time_start

        extra_information = request.json['extra_information']
        status = request.json['status']

        if status == "reserved":
            # print("tesss")
            check_bookings = Bookings.query.filter(Bookings.id != id).filter_by(room_id=room_id, booking_date=booking_date, status="reserved").all()
            if check_bookings is not None:
                data_check_bookings = transform(check_bookings, withUser=False,withRoom=False)
                for data_check_booking in data_check_bookings:
                    if (is_time_between(data_check_booking['booking_time_start'], data_check_booking['booking_time_end'], 
                        check_time=booking_time_start) or is_time_between(data_check_booking['booking_time_start'], 
                        data_check_booking['booking_time_end'], check_time=booking_time_end)):
                        return response.ok('Error', 'Anda tidak dapat mem-booking karena sudah ada yang melakukan booking terlebih dahulu')

                    if (is_time_between2(booking_time_start, booking_time_end, check_time=data_check_booking['booking_time_start']) or 
                        is_time_between2(booking_time_start, booking_time_end, check_time=data_check_booking['booking_time_end'])):
                        return response.ok('Error', 'Anda tidak dapat mem-booking karena terjadi bentrok dengan booking sebelumnya')

        bookings = Bookings.query.filter_by(id=id).first()
        bookings.room_id = room_id
        bookings.user_id = user_id
        bookings.booking_date = booking_date
        bookings.booking_time_start = booking_time_start
        bookings.booking_time_end = booking_time_end
        bookings.extra_information = extra_information
        bookings.status = status

        db.session.commit()

        return response.ok('', 'Successfully update data!')
    except Exception as e:
        print(e)

@jwt_required
def delete(id):
    try:
        bookings = Bookings.query.filter_by(id=id).first()
        if not bookings:
            return response.badRequest([], 'Empty....')

        db.session.delete(bookings)
        db.session.commit()

        return response.ok('', 'Successfully delete data!')
    except Exception as e:
        print(e)

def is_time_between(begin_time, end_time, check_time):
    # pprint(begin_time)
    # pprint(end_time)
    # pprint(check_time)

    check_time = time.strftime("%H:%M", check_time)
    # pprint(check_time)
    check_time = datetime.datetime.strptime(check_time,"%H:%M").time()
    # pprint(check_time)

    if begin_time < end_time:
        return check_time >= begin_time and check_time <= end_time
    else: # crosses midnight
        return check_time >= begin_time or check_time <= end_time

def is_time_between2(begin_time, end_time, check_time):
    begin_time = time.strftime("%H:%M", begin_time)
    begin_time = datetime.datetime.strptime(begin_time,"%H:%M").time()

    end_time = time.strftime("%H:%M", end_time)
    end_time = datetime.datetime.strptime(end_time,"%H:%M").time()

    if begin_time < end_time:
        return check_time >= begin_time and check_time <= end_time
    else: # crosses midnight
        return check_time >= begin_time or check_time <= end_time
