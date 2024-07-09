from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from resources import UserRegister, UserLogin, TopicResource, AdminResource, TaskResource, AdminTopicManagementResource
from datetime import datetime
import json

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

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
    api.add_resource(UserRegister, '/register')
    api.add_resource(UserLogin, '/login')
    api.add_resource(TopicResource, '/topics')
    api.add_resource(AdminResource, '/admin')
    api.add_resource(TaskResource, '/tasks')
    api.add_resource(AdminTopicManagementResource, '/admin/topics/<int:topic_id>/<string:action>')

    # Create the database tables
    with app.app_context():
        db.create_all()

    return app

app = create_app()
app.json_encoder = CustomJSONEncoder

if __name__ == '__main__':
    print(app.url_map)
    app.run(debug=True)
