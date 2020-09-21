from app import app
from app.controller import bookingController
from flask import request

@app.route('/bookings',methods=['POST','GET'])
def bookings():
    if request.method == 'GET':
        return bookingController.index()
    else:
        return bookingController.store()
        
@app.route('/bookings/<id>',methods=['PUT','GET','DELETE'])
def bookingsDetail(id):
    if request.method == 'GET':
        return bookingController.show(id)
    elif request.method == 'PUT':
        return bookingController.update(id)
    elif request.method == 'DELETE':
        return bookingController.delete(id)