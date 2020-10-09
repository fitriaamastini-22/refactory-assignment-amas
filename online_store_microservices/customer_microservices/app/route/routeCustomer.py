from app import app
from app.controllers import controllerCustomer
from flask import request


@app.route('/customer', methods=['POST','GET'])
def customer():
    if request.method == 'POST':
        return controllerCustomer.store()
    elif request.method == 'GET':
        return controllerCustomer.index()


@app.route('/customer/<id>', methods=['PUT','GET','DELETE'])
def customerDetail(id):
    if request.method == 'GET':
        return controllerCustomer.show(id)
    elif request.method == 'PUT':
        return controllerCustomer.update(id)
    elif request.method == 'DELETE':
        return controllerCustomer.delete(id)