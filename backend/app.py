# backend/app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from config import Config
from models import db

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    app.config.from_object(Config)
    app.config['JWT_SECRET_KEY'] = '123'

    # Initialize the extensions
    db.init_app(app)
    jwt = JWTManager(app)
    api = Api(app)

    # Register the resources
    from resources import UserRegister, UserLogin, TopicResource, AdminResource
    api.add_resource(UserRegister, '/register')
    api.add_resource(UserLogin, '/login')
    api.add_resource(TopicResource, '/topics')
    api.add_resource(AdminResource, '/admin')

    # Create the database tables
    with app.app_context():
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    print(app.url_map)
    app.run(debug=True)