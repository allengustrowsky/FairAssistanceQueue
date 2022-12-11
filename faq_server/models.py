# from faq_server import db
from sqlalchemy.sql import func
# from flask_sqlalchemy import SQLAlchemy
from . import db

# db = SQLAlchemy()

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    admin_key = db.Column(db.String(36), nullable=False, unique=True) #uuid
    ta_key = db.Column(db.String(36), nullable=False, unique=True) #uuid
    course_code = db.Column(db.String(16)) 
    description = db.Column(db.String(512))
    school = db.Column(db.String(128))
    questions_answered = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
     # stores questions in table in an an array-like structure so that they can be referenced easily
    questions = db.relationship('Question')

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    content = db.Column(db.String(128))
    up_votes = db.Column(db.Integer)
    submitted_by = db.Column(db.String(32))
    is_answered = db.Column(db.Boolean, default=False)
    is_important_question = db.Column(db.Boolean, default=False)
    path = db.Column(db.String) # file uploading
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())


