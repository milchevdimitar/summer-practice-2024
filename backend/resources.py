from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Topic, Task, News

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

class UserDetailsResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user:
            return {'email': user.email, 'role': user.role}, 200
        else:
            return {'message': 'User not found'}, 404

class TopicResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.is_student():
            topics = Topic.query.filter_by(student_id=user_id).all()
            topics_list = [
                {'id': topic.id, 'title': topic.title, 'approved': topic.approved}
                for topic in topics
            ]
            return {'topics': topics_list}, 200
        elif user.is_admin():
            topics = Topic.query.all()
            topics_list = [
                {
                    'id': topic.id,
                    'title': topic.title,
                    'student_name': User.query.get(topic.student_id).email,
                    'approved': topic.approved
                }
                for topic in topics
            ]
            return {'topics': topics_list}, 200
        else:
            return {'message': 'Access denied'}, 403

class AdminTopicManagementResource(Resource):
    @jwt_required()
    def put(self, topic_id, action):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.is_admin():
            topic = Topic.query.get(topic_id)
            if not topic:
                return {'message': 'Topic not found'}, 404
            if action == 'approve':
                topic.approved = True
                db.session.commit()
                return {'message': 'Topic approved successfully'}, 200
            elif action == 'reject':
                db.session.delete(topic)
                db.session.commit()
                return {'message': 'Topic rejected and removed successfully'}, 200
            else:
                return {'message': 'Invalid action'}, 400
        else:
            return {'message': 'Admin access is required'}, 403

class AdminResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.is_admin():
            users = User.query.all()
            users_list = [
                {'id': user.id, 'email': user.email, 'role': user.role}
                for user in users
            ]
            return {'users': users_list}, 200
        else:
            return {'message': 'Admin access is required'}, 403

class TaskResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if user.is_student():
            tasks = Task.query.filter_by(student_id=user_id).all()
            tasks_list = [
                {
                    'id': task.id,
                    'title': task.title,
                    'deadline': task.deadline.isoformat(),
                    'description': task.description,
                    'supervisor': User.query.get(task.supervisor_id).email if User.query.get(task.supervisor_id) else "No supervisor"
                }
                for task in tasks
            ]
            return {'tasks': tasks_list}, 200
        elif user.is_supervisor():
            supervised_tasks = Task.query.filter_by(supervisor_id=user_id).all()
            tasks_list = [
                {
                    'id': task.id,
                    'title': task.title,
                    'deadline': task.deadline.isoformat(),
                    'description': task.description,
                    'student': User.query.get(task.student_id).email if User.query.get(task.student_id) else "No student"
                }
                for task in supervised_tasks
            ]
            return {'tasks': tasks_list}, 200
        else:
            return {'message': 'Access denied'}, 403

class NewsResource(Resource):
    @jwt_required()
    def get(self):
        news = News.query.all()
        news_list = [
            {'id': item.id, 'title': item.title, 'date_posted': item.date_posted.isoformat(), 'content': item.md_content}
            for item in news
        ]
        return {'news': news_list}, 200