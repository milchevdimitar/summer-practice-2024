from flask import Flask
from models import db, User, Topic, Task
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/postgres'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Add this line
    db.init_app(app)
    return app

def add_student():
    email = "milchevdimitar@gmail.com"
    existing_user = User.query.filter_by(email=email).first()
    if existing_user is not None:
        print(f"A user with the email {email} already exists.")
        return

    new_student = User(
        email=email,
        password=generate_password_hash("123"),
        role="supervisor"
    )
    db.session.add(new_student)
    db.session.commit()
    print(f"Added new student with email {email}.")

def add_task():
    title = "Задача 2"
    student_id = 1
    deadline = datetime.now()  # Example deadline value, adjust as necessary
    existing_task = Task.query.filter_by(title=title).first()
    if existing_task is not None:
        print(f"A task with the title {title} already exists.")
        return

    new_task = Task(
        title=title,
        student_id=student_id,
        deadline=deadline  # Add the deadline here
    )
    db.session.add(new_task)
    db.session.commit()
    print(f"Added new task with title {title}.")

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
    add_task()
    print_all_tables()