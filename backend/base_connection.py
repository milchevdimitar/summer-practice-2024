from flask import Flask
from models import *
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123@localhost/postgres'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Add this line
    db.init_app(app)
    return app

def add_student():
    email = "dimitar.v.milchev.2020@gmail.com"
    existing_user = User.query.filter_by(email=email).first()
    if existing_user is not None:
        print(f"A user with the email {email} already exists.")
        return

    new_student = User(
        email=email,
        password=generate_password_hash("123"),
        role="student"
    )
    db.session.add(new_student)
    db.session.commit()
    print(f"Added new student with email {email}.")

def add_task():
    title = "Задача 3"
    student_id = 6
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

def delete_topic_by_id(topic_id):
    topic = Topic.query.get(topic_id)
    if topic is None:
        print(f"Topic with ID {topic_id} does not exist.")
        return

    db.session.delete(topic)
    db.session.commit()
    print(f"Deleted topic with ID {topic_id}.")

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

    print("\nNews:")
    news = News.query.all()
    for n in news:
        print(f"ID: {n.id}, Title: {n.title}, Date Posted: {n.date_posted}")

def add_news():
    try:
        title = "Новина 1"
        md_content = "Това е съдържанието на новина 1."
        date_posted = datetime.now()
        new_news = News(
            title=title,
            md_content=md_content,
            date_posted=date_posted
        )
        db.session.add(new_news)
        db.session.commit()
        print(f"Added new news with title {title}.")
    except Exception as e:
        print(f"Failed to add news: {e}")

app = create_app()

with app.app_context():
#    add_student()
#    add_task()
#    delete_topic_by_id()
    add_news()
    print_all_tables()