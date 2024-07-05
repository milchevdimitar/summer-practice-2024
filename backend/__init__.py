# backend/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
from .config import Config
from .models import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Инициализация на разширенията
    db.init_app(app)
    jwt = JWTManager(app)
    api = Api(app)

    # Регистрация на ресурсите
    from .resources import UserRegister, UserLogin, TopicResource, AdminResource
    api.add_resource(UserRegister, '/register')
    api.add_resource(UserLogin, '/login')
    api.add_resource(TopicResource, '/topics')
    api.add_resource(AdminResource, '/admin')

    # Създаване на таблиците в базата данни
    with app.app_context():
        db.create_all()

    return app