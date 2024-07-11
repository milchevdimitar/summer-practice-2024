# backend/models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    # Specify foreign_keys in relationships to resolve ambiguity
    topics = db.relationship('Topic', backref='student', lazy=True, foreign_keys='Topic.student_id')
    tasks = db.relationship('Task', backref='student', lazy=True, foreign_keys='Task.student_id')
    supervised_tasks = db.relationship('Task', backref='supervisor', lazy=True, foreign_keys='Task.supervisor_id')

    def is_student(self):
        return self.role == 'student'

    def is_supervisor(self):
        return self.role == 'supervisor'

    def is_admin(self):
        return self.role == 'admin'

class Topic(db.Model):
    __tablename__ = 'topic'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    approved = db.Column(db.Boolean, default=False)
    supervisor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    # Explicitly specify the relationship and foreign_keys to resolve ambiguity
    supervisor = db.relationship('User', foreign_keys=[supervisor_id], backref='supervised_topics')

class Task(db.Model):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    deadline = db.Column(db.DateTime, nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    supervisor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    md_content = db.Column(db.Text, nullable=False)  # Store Markdown content directly
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)