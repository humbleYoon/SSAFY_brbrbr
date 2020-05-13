from datetime import datetime
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse

import uuid
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
api = Api(app)

app.config.from_pyfile('config.py')
db = SQLAlchemy(app)


class USER(db.Model):
    __table_name__ = 'USER'
    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    name = db.Column(db.String(50))
    nickname = db.Column(db.String(50))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(2))
    created = db.Column(db.DateTime, default=datetime.utcnow())
    updated = db.Column(db.DateTime, default=datetime.utcnow())


class UserAPI(Resource):
    def get(self):
        pass

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('name', type=str)
        parser.add_argument('nickname', type=str)
        parser.add_argument('age', type=int)
        parser.add_argument('gender', type=str)
        args = parser.parse_args()

        _email = args['email']
        _password = args['password']
        _name = args['name']
        _nickname = args['nickname']
        _age = args['age']
        _gender = args['gender']

        hashed = generate_password_hash(_password, method='sha256')
        user = USER(user_id=str(uuid.uuid4()), email=_email, password=_password,
                    name=_name, nickname=_nickname, age=_age, gender=_gender)
        db.session.add(user)
        db.session.commit()

        return {
            'state': 'success',
            'email': args['email'],
            'password': args['password'],
            'name': args['name'],
            'nickname': args['nickname'],
            'age': args['age'],
            'gender': args['gender'],
        }, 200


api.add_resource(UserAPI, '/user')

if __name__ == '__main__':
    app.run(debug=True)
