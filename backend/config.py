# backend/config.py
class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:123@localhost:5432/postgres"
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # To suppress the warning