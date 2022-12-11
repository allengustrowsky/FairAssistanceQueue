from flask import Flask, request, Response
from flask_cors import CORS  # comment this on deployment
from flask_sqlalchemy import SQLAlchemy
from os import path
import uuid
# import course

# from models import Course, Question

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    # say where db is going to be stored (name = faq_db.db)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///faq_db.db'
    db.init_app(app)  # connect flask app with database

    # need models to load/run before calling create_all()
    from .models import Course, Question, Owner

    # if db doesn't exist, create it
    if not path.exists('instance/faq_db.db'):
        with app.app_context():
            db.create_all()
        print('Database successfully created')
    else:
        print('Database exists')

    CORS(app)

    # /members: FOR TESTING ONLY - DELETE
    @app.route("/members")
    def members():
        return {"members": ["Member1", "Member2", "Member3"]}

    # note:always check api key(s), make sure it's the correct type of data, allow if owner

    # sign into course
    @app.route('/course/sign-in', methods=['POST'])
    def sign_in():
        if request.headers.get('Content-Type') == 'application/json': # ensure valid Content-Type
            jsonData = request.json

            # ensure valid course code
            if Course.is_valid_course(jsonData['courseCode']):
                course = Course.query.filter_by(course_code=jsonData['courseCode']).first()
                return {
                    'message': 'Successfully signed into course.',
                    'courseName': course.name,
                    'courseCode': course.course_code,
                    'isAdmin': Course.is_admin_for_course(jsonData['adminKey'], jsonData['courseCode']),
                    'isTA': Course.is_TA_for_course(jsonData['adminKey'], jsonData['courseCode']),
                    'status': 200,
                }
            else:
                return {
                    'message': 'Invalid course code!',
                    'status': 400
                }

        else:
            return {
                'message': 'Content-Type not supported!',
                'status': 400
            }

    # gete course info (for index page)
    @app.route('/course/index')
    def index():
        return {'message': 'success!!'}

    # create course
    @app.route('/course/create', methods=['POST'])
    def create_course():
        if request.headers.get('Content-Type') == 'application/json': # ensure valid Content-Type
            jsonData = request.json
            # ensure user is admin
            if Course.is_admin(jsonData['adminKey']) or Owner.is_owner(jsonData['adminKey']):
                # if course code is unique
                if Course.is_code_unique(jsonData['courseCode']): # if course code is unique
                    # create keys
                    admin_key = str(uuid.uuid4())
                    TA_key = str(uuid.uuid4())
                    # ensure keys are unique
                    while not (Course.is_admin_key_unique(admin_key) and Course.is_ta_key_unique(TA_key)):
                        admin_key = str(uuid.uuid4())
                        TA_key = str(uuid.uuid4())
                    # create new course with params
                    course = Course( 
                                name=jsonData['name'], 
                                admin_key=admin_key,
                                ta_key=TA_key,
                                course_code=jsonData['courseCode'], 
                                description=jsonData['description'],
                                school=jsonData['school'], 
                            )
                    db.session.add(course)
                    db.session.commit()
                    return {
                        'message': 'Course successfully created!',
                        'adminKey': admin_key,
                        'taKey': TA_key,
                        'courseCode': jsonData['courseCode'],
                        'status': 201,
                    }
                else: # course code is not unique
                    return {
                        'message': 'Course code already taken!',
                        'statue': 400
                    }
            else: # not authorized
                return {
                    'message': 'Not authorized. Please provide a valid admin key.',
                    'status': 403
                }            
        else: # invalid Content-Type
            return {
                'message': 'Content-Type not supported!',
                'status': 400
            }

    # submit question

    # mark as answered

    # questions answered in this course

    # from models import Course
    # @app.route("/members")
    # def members():
    #     new_course = Course(name='Members of the app', admin_key='1234ghjk1234ghjk', ta_key='sadfjklhq298')
    #     db.session.add(new_course)
    #     db.session.commit()
    #     Flask.flash('success!', category='success')
    #     return {"members": ["Member1", "Member2", "Member3"]}

    return app


# if __name__ == "__main__":
    # app.run(debug=True)

    # have to move routes to different file to prevent circular imports
