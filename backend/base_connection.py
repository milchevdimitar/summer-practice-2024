from flask import Flask
from models import db, User, Topic, Task
from werkzeug.security import generate_password_hash

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/postgres'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Add this line
    db.init_app(app)
    return app

def add_student():
    email = "dimitar.v.milchev.2020@elsys-bg.org"
    existing_user = User.query.filter_by(email=email).first()
    if existing_user is not None:
        print(f"A user with the email {email} already exists.")
        return

    new_student = User(
        email=email,
        password=generate_password_hash("123"),  # Използваме хеширане на паролите
        role="student"
    )
    db.session.add(new_student)
    db.session.commit()
    print(f"Added new student with email {email}.")

def print_all_tables():
    users = User.query.all()
    topics = Topic.query.all()
    tasks = Task.query.all()

    print("Users:")
    for user in users:
        print(f"ID: {user.id}, Email: {user.email}, Role: {user.role}")

    print("\nTopics:")
    for topic in topics:
        print(f"ID: {topic.id}, Title: {topic.title}, Student ID: {topic.student_id}, Supervisor ID: {topic.supervisor_id}")

    print("\nTasks:")
    for task in tasks:
        print(f"ID: {task.id}, Title: {task.title}, Student ID: {task.student_id}")

app = create_app()

with app.app_context():
    add_student()
    print_all_tables()