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
        md_content = ("""
            # Пълната Доминация на Реал Мадрид: Успехите от 2010 до Днес)
            ## Въведение
            Реал Мадрид е един от най-емблематичните футболни клубове в света, известен със своята история, култура и множество успехи.
            От 2010 година насам, клубът успя да утвърди своята доминация както на национално, така и на международно ниво.
            В тази статия ще разгледаме основните постижения и моменти, които определят този период.
            ## Национални Успехи
            ### Ла Лига
            От 2010 година, Реал Мадрид спечели Ла Лига четири пъти:
            - **2011-2012**
            - **2016-2017**
            - **2019-2020**
            - **2021-2022**
            Сезонът 2011-2012 беше особено запомнящ се, когато под ръководството на Жозе Моуриньо, Реал Мадрид събра рекордните 100 точки и отбеляза 121 гола.
            ### Купата на Краля (Копа дел Рей)
            Реал Мадрид спечели Купата на Краля три пъти през този период:
            - **2010-2011**
            - **2013-2014**
            - **2022-2023**
            Финалът през 2014 година срещу Барселона ще бъде запомнен с невероятния гол на Гарет Бейл, който пробяга половината терен, за да отбележи решаващия гол.
            ## Международни Успехи
            ### Шампионска Лига (УЕФА)
            Реал Мадрид демонстрира своето господство в Шампионската лига с безпрецедентни успехи. От 2010 година, клубът спечели турнира пет пъти:
            - **2013-2014**
            - **2015-2016**
            - **2016-2017**
            - **2017-2018**
            - **2021-2022**
            Тези успехи включват спечелването на т.н. "Ла Десима" през 2014 година (десетата титла), както и уникалното постижение от три поредни трофея между 2016 и 2018 година под ръководството на Зинедин Зидан.
            ### Суперкупа на УЕФА
            Реал Мадрид спечели Суперкупата на УЕФА четири пъти:
            - **2014**
            - **2016**
            - **2017**
            - **2022**
            ### Световно Клубно Първенство (ФИФА)
            Клубът също така доминира и на световно ниво, спечелвайки Световното клубно първенство пет пъти:
            - **2014**
            - **2016**
            - **2017**
            - **2018**
            - **2022**
            ## Треньори и Играчите, Които Оформят Ерата
            ### Треньори
            - **Жозе Моуриньо** (2010-2013): Положи основите за бъдещите успехи и донесе няколко важни трофеи.
            - **Карло Анчелоти** (2013-2015, 2021-): Спечели "Ла Десима" и възстанови клуба на върха през 2021 година.
            - **Зинедин Зидан** (2016-2018, 2019-2021): Въведе "Златната ера" с три поредни титли в Шампионската лига.
            ### Звездни Играчите
            - **Кристиано Роналдо**: Ключова фигура в успехите на клуба, като стана най-добрият голмайстор в историята на Реал Мадрид.
            - **Серхио Рамос**: Легендарен капитан и защитник, който водеше отбора към множество победи.
            - **Лука Модрич**: Играеща легенда и носител на "Златната топка" през 2018 година.
            - **Карим Бензема**: Един от най-надеждните нападатели на клуба, който продължава да блести на терена.
            ## Заключение
            От 2010 година насам, Реал Мадрид утвърди своята репутация като един от най-великите футболни клубове в историята. 
            С впечатляващи национални и международни успехи, клубът продължава да вдъхновява и да доминира световния футбол.
            Силните треньори, легендарните играчи и непоколебимата подкрепа на феновете са ключовите фактори, които правят Реал Мадрид истински гигант на футболната сцена.
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

app = create_app()

with app.app_context():
#    add_student()
#    add_task()
#    delete_topic_by_id()
    add_news()
#   delete_news_by_id(4)
    print_all_tables()