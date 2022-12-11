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
    course_code = db.Column(db.String(16), nullable=False, unique=True) 
    description = db.Column(db.String(512))
    school = db.Column(db.String(128))
    questions_answered = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
     # stores questions in table in an an array-like structure so that they can be referenced easily
    questions = db.relationship('Question')

    @staticmethod
    def is_admin(key):
        admin_record = Course.query.filter_by(admin_key=key).first()
        return False if admin_record is None else True

    @staticmethod
    def is_admin_for_course(key, code):
        admin_record = Course.query.filter_by(admin_key=key, course_code=code).first()
        return False if admin_record is None else True

    @staticmethod
    def is_TA(key):
        TA_record = Course.query.filter_by(ta_key=key).first()
        return False if TA_record is None else True

    @staticmethod
    def is_TA_for_course(key, code):
        TA_record = Course.query.filter_by(ta_key=key, course_code=code).first()
        return False if TA_record is None else True

    @staticmethod
    def is_admin_key_unique(key):
        # ensure given key does not match admin or TA key
        admin_key = Course.query.filter_by(admin_key=key).first()
        TA_key = Course.query.filter_by(ta_key=key).first()
        return True if (admin_key is None and TA_key is None) else False

    @staticmethod
    def is_ta_key_unique(key):
        # ensure given key does not match admin or TA key
        TA_key = Course.query.filter_by(ta_key=key).first()
        admin_key = Course.query.filter_by(admin_key=key).first()
        return True if (TA_key is None and admin_key is None) else False

    @staticmethod
    def is_code_unique(code):
        course = Course.query.filter_by(course_code=code).first()
        return True if course is None else False

    @staticmethod
    def is_valid_course(code):
        course = Course.query.filter_by(course_code=code).first()
        return False if course is None else True

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

class Owner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    master_key = db.Column(db.String(36), nullable=False) # uuid
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())

    @staticmethod
    def is_owner(key):
        owner_key = Owner.query.filter_by(master_key=key).first()
        return False if owner_key is None else True
