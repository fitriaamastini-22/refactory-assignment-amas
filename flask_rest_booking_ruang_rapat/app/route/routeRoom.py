from app import app
from app.controller import roomController
from flask import request

@app.route('/rooms',methods=['POST','GET'])
def rooms():
    if request.method == 'GET':
        return roomController.index()
    else:
        return roomController.store()

@app.route('/users/',methods=['PUT','GET','DELETE'])
@app.route('/users/<id>',methods=['PUT','GET','DELETE'])
def roomsDetail(id=0):
    if request.method == 'GET':
        return roomController.show(id)
    elif request.method == 'PUT':
        return roomController.update(id)
    elif request.method == 'DELETE':
        return roomController.delete(id)