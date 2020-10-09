from app.model.customer import Customers
from app import response,db
from flask import request,jsonify
from app import db

def store():
    try:
        full_name     = request.json['full_name']
        username      = request.json['username']
        email         = request.json['email']
        phone_number  = request.json['phone_number']
        gender        = request.json['gender']
        address       = request.json['address']

        customer       = Customers(full_name=full_name, username=username, email=email, phone_number=phone_number, gender=gender, address=address)
        db.session.add(customer)
        db.session.commit()
        return response.ok('', 'Berhasil menambahkan Data Customer !')
    except Exception as e:
        print(e)

def index():
    try:
        customer    = Customers.query.all()
        data        = transform(customer)
        return response.ok(data,"Data Customer berhasil ditemukan")
    except Exception as e:
        print(e)

def update(id):
    try:
        full_name     = request.json['full_name']
        username      = request.json['username']
        email         = request.json['email']
        phone_number  = request.json['phone_number']
        gender        = request.json['gender']
        address       = request.json['address']

        customer               = Customers.query.filter_by(id = id).first()
        customer.full_name     = full_name
        customer.username      = username
        customer.email         = email
        customer.phone_number  = phone_number
        customer.gender        = gender
        customer.address       = address

        db.session.commit()
        return response.ok('', 'Berhasil memperbaharui Data Customer !')
    except Exception as e:
        print(e)

def show(id):
    try:
        customer = Customers.query.filter_by(id=id).first()
        if not customer:
            return response.badRequest([], 'Kosong....??!')
        data = singleTransform(customer)
        return response.ok(data,"Data Customer Berhasil ditemukan")
    except Exception as e:
        print(e)

def delete(id):
    try:
        customer = Customers.query.filter_by(id = id).first()
        if not customer:
            return response.badRequest([], 'Kosong....??!')
        db.session.delete(customer)
        db.session.commit()
        return response.ok('', 'Berhasil menghapus Data Customer !')
    except Exception as e:
        print(e)


def transform(customer):
    array = []
    for i in customer:
        array.append(singleTransform(i))
    return array


def singleTransform(customer):
    data = {
        'id' : customer.id,
        'full_name'     : customer.full_name,
        'username'      : customer.username,
        'email'         : customer.email,
        'phone_number'  : customer.phone_number,
        'gender'        : customer.gender,
        'address'       : customer.address,
        'created_at'    : customer.created_at,
        'updated_at'    : customer.updated_at
    }

    return data