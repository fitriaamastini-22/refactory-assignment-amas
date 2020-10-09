from app.model.merchant import Merchants
from app import response,db,app
from flask import request,jsonify
import os
import urllib.request
import datetime
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit(
        '.', 1)[1].lower() in ALLOWED_EXTENSIONS

def store():
    try:
        if 'file' not in request.files:
            resp = jsonify({'message': 'No file part in the request'})
            resp.status_code = 400
            return resp

        file = request.files['file']
        if file.filename == '':
            resp = jsonify({'message': 'No file selected for uploading'})
            resp.status_code = 400
            return resp

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_convert = filename
            file_convert = "merchant__image__"+id+"__"+ file_convert.lower()
            name          = request.json['name']
            address       = request.json['address']
            rating        = 0

            merchant       = Merchants(name=name, image = file_convert, address=address, rating=rating)
            db.session.add(merchant)
            db.session.commit()
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file_convert))
            resp = jsonify({'message': 'Data Merchant berhasil ditambahkan'})
            resp.status_code = 201

            return resp
        else:
            resp = jsonify({
                'message':
                'Allowed file types are png, jpg, jpeg, gif'
            })
            resp.status_code = 400
            return resp
    except Exception as e:
        print(e)

def index():
    try:
        merchant    = Merchants.query.all()
        data        = transform(merchant)
        return response.ok(data,"Data Merchant berhasil ditemukan")
    except Exception as e:
        print(e)

def update(id):
    try:
        name          = request.json['name']
        address       = request.json['address']

        merchant               = Merchants.query.filter_by(id = id).first()
        merchant.name          = name
        merchant.address       = address

        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                if file and allowed_file(file.filename):
                    old_image       = merchant.image
                    filename        = secure_filename(file.filename)
                    file_convert    = filename
                    file_convert    = "merchant__image__"+id+"__"+ file_convert.lower()
                    merchant.image  = file_convert

                    path_image = os.path.join(app.config['UPLOAD_FOLDER'], old_image)
                    if os.path.exists(path_image):
                        os.remove(path_image)
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], merchant.image))

        db.session.commit()
        return response.ok('', 'Berhasil memperbaharui Data Merchant !')
    except Exception as e:
        print(e)

def show(id):
    try:
        merchant = Merchants.query.filter_by(id=id).first()
        if not merchant:
            return response.badRequest([], 'Kosong....??!')
        data = singleTransform(merchant)
        return response.ok(data,"Data Merchant Berhasil ditemukan")
    except Exception as e:
        print(e)

def delete(id):
    try:
        merchant = Merchants.query.filter_by(id = id).first()
        file_image = merchant.image

        if not merchant:
            return response.badRequest([], 'Kosong....??!')

        db.session.delete(merchant)
        db.session.commit()

        path_image = os.path.join(app.config['UPLOAD_FOLDER'], file_image)

        if os.path.exists(path_image):
            os.remove(path_image)

        return response.ok('', 'Berhasil menghapus Data Merchant !')
    except Exception as e:
        print(e)

def submitRate(id):
    try:
        rating          = request.json['rating']

        merchant               = Merchants.query.filter_by(id = id).first()
        sum_rate               = merchant.rating * merchant.num_rate
        merchant.num_rate      = merchant.num_rate + 1
        merchant.rating        = (sum_rate + rating)/merchant.num_rate

        db.session.commit()
        return response.ok('', 'Berhasil memberi rating Merchant !')
    except Exception as e:
        print(e)

def transform(merchant):
    array = []
    for i in merchant:
        array.append(singleTransform(i))
    return array


def singleTransform(merchant):
    data = {
        'id' : merchant.id,
        'name'     : merchant.name,
        'image'      : merchant.image,
        'address'         : merchant.address,
        'rating'  : merchant.rating,
        'num_rate'        : merchant.num_rate,
        'created_at'    : merchant.created_at,
        'updated_at'    : merchant.updated_at
    }

    return data