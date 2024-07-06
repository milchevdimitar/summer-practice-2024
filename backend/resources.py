# backend/resources.py
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Topic, Task


class UserRegister(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', required=True, help="This field cannot be blank.")
        parser.add_argument('password', required=True, help="This field cannot be blank.")
        parser.add_argument('role', required=True, help="This field cannot be blank.")
        data = parser.parse_args()

        if User.query.filter_by(email=data['email']).first():
            return {'message': 'User already exists'}, 400

        user = User(
            email=data['email'],
            password=generate_password_hash(data['password']),  # Използваме хеширане на паролите
            role=data['role']
        )
        db.session.add(user)
        db.session.commit()

        return {'message': 'User created successfully'}, 201

class UserLogin(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', required=True, help="This field cannot be blank.")
        parser.add_argument('password', required=True, help="This field cannot be blank.")
        data = parser.parse_args()

        user = User.query.filter_by(email=data['email']).first()
        if not user or not check_password_hash(user.password, data['password']):
            return {'message': 'Invalid credentials'}, 401

        access_token = create_access_token(identity=user.id)
        return {'access_token': access_token}, 200

class TopicResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user.is_student():
            return {'message': 'Only students can propose topics'}, 403

        parser = reqparse.RequestParser()
        parser.add_argument('title', required=True, help="This field cannot be blank.")
        parser.add_argument('description', required=False)
        data = parser.parse_args()

        topic = Topic(
            title=data['title'],
            description=data.get('description'),
            student_id=user_id,
            approved=False  # Topics are not approved by default
        )
        db.session.add(topic)
        db.session.commit()

        return {'message': 'Topic proposed successfully'}, 201

class AdminResource(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user.is_admin():
            return {'message': 'Admin access is required'}, 403

    @jwt_required()
    def put(self, topic_id):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user.is_admin():
            return {'message': 'Admin access is required'}, 403

        topic = Topic.query.get(topic_id)
        if not topic:
            return {'message': 'Topic not found'}, 404

        topic.approved = True
        db.session.commit()

        return {'message': 'Topic approved successfully'}, 200