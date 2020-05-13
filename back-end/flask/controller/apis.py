from flask import Flask, request
from flask_restful import Resource, Api, reqparse

def user_post():
  user = request.json
  user_id = app

# def createUser(test_config=None):
#     parser = reqparse.RequestParser()
#     parser.add_argument('email', type=str)
#     parser.add_argument('password', type=str)
#     parser.add_argument('name', type=str)
#     parser.add_argument('nickname', type=str)
#     parser.add_argument('age', type=int)
#     parser.add_argument('gender', type=str)
#     args = parser.parse_args()

#     _email = args['email']
#     _password = args['password']
#     _name = args['name']
#     _nickname = args['nickname']
#     _age = args['age']
#     _gender = args['gender']

#     return {
#         'state': 'success',
#         'email': args['email'],
#         'password': args['password'],
#         'name': args['name'],
#         'nickname': args['nickname'],
#         'age': args['age'],
#         'gender': args['gender'],
#     }


def API():
    app = Flask(__name__)
    Api(app).add_resource(CreateUser, '/user')
