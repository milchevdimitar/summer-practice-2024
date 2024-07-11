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

def add_task(title, student_id, description, deadline, supervisor_id):
    existing_task = Task.query.filter_by(title=title).first()
    if existing_task is not None:
        print(f"A task with the title {title} already exists.")
        return

    new_task = Task(
        supervisor_id=supervisor_id,
        title=title,
        student_id=student_id,
        deadline=deadline,
        description=description
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
        print(f"ID: {task.id}, Title: {task.title}, Student ID: {task.student_id}, Description: {task.description}, Supervisor ID: {task.supervisor_id}")

    print("\nNews:")
    news = News.query.all()
    for n in news:
        print(f"ID: {n.id}, Title: {n.title}, Date Posted: {n.date_posted}")

def add_news():
    try:
        title = "Възобновяеми Енергийни Източници"
        md_content = ("""
        Възобновяемите енергийни източници, като слънчевата, вятърната и водната енергия, играят
        ключова роля в борбата с климатичните промени. Те предоставят чиста и устойчива алтернатива
        на изкопаемите горива, като намаляват емисиите на парникови газове и зависимостта от
        ограничени ресурси. Въпреки че инвестициите в инфраструктура за възобновяема енергия могат
        да бъдат високи, дългосрочните ползи за околната среда и икономиката са значителни.
        Развитието на технологии за съхранение на енергия също спомага за увеличаване на ефективността
        и надеждността на тези източници.
        """)
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

def delete_news_by_id(news_id):
    news = News.query.get(news_id)
    if news is None:
        print(f"News with ID {news_id} does not exist.")
        return

    db.session.delete(news)
    db.session.commit()
    print(f"Deleted news with ID {news_id}.")

def delete_task_by_id(task_id):
    task = Task.query.get(task_id)
    if task is None:
        print(f"Task with ID {task_id} does not exist.")
        return

    db.session.delete(task)
    db.session.commit()
    print(f"Deleted task with ID {task_id}.")

app = create_app()

with app.app_context():
#    add_student()
#    add_task()
#    delete_topic_by_id()
#    add_news()
#    delete_news_by_id(17)
#    for i in range(2, 8):
#        delete_task_by_id(i)
    add_task("Задача 1", 1, "Описание 1", datetime(2025, 5, 1), 5)
    add_task("Задача 2", 1, "Описание 2", datetime(2025, 5, 1), 5)
    add_task("Задача 3", 1, "Описание 3", datetime(2025, 5, 1), 5)
    print_all_tables()