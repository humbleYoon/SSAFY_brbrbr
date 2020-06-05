from flask import Flask, request, jsonify, current_app
from sqlalchemy import create_engine, text


def create_app(test_config=None):
    app = Flask(__name__)

    if test_config is None:
        app.config.from_pyfile('config.py')
    else:
        app.config.update(test_config)

    database = create_engine(
        app.config['DB_URL'], encoding='utf-8', max_overflow=0)
    app.database = database

    # @app.route("/user", methods=['POST'])
    # def user_post():
    #     user = request.json
    #     print(user)
    #     user_id = app.database.execute(text("""
    #     INSERT INTO USER (
    #       email, password, name, nickname, age, gender)
    #       VALUES (:email, :password, :name, :nickname, :age, :gender)
    #     """), user).lastrowid

    #     row = current_app.database.execute(text("""
    #     SELECT
    #       email, password, name, nickname, age, gender
    #       FROM USER WHERE user_id=:user_id
    #     """), {
    #         'user_id': user_id
    #     }).fetchone()

    #     created_user = {
    #         'email': row['email'],
    #         'password': row['password'],
    #         'name': row['name'],
    #         'nickname': row['nickname'],
    #         'age': row['age'],
    #         'gender': row['gender']
    #     } if row else None
    #     return jsonify(created_user)
    return app

if __name__ == '__main__':
  create_app().run(debug=True)