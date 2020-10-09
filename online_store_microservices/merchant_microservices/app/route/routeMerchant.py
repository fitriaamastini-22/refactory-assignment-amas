from app import app
from app.controllers import controllerMerchant
from flask import request

@app.route('/merchant', methods=['POST','GET'])
def merchant():
    if request.method == 'POST':
        return controllerMerchant.store()
    elif request.method == 'GET':
        return controllerMerchant.index()


@app.route('/merchant/<id>', methods=['PUT','GET','DELETE'])
def merchantDetail(id):
    if request.method == 'GET':
        return controllerMerchant.show(id)
    elif request.method == 'PUT':
        return controllerMerchant.update(id)
    elif request.method == 'DELETE':
        return controllerMerchant.delete(id)

@app.route('/merchant-submit-rate', methods=['POST'])
def merchantRate(id):
    if request.method == 'POST':
        return controllerMerchant.submitRate(id)