from flask import Flask, request, Response
from flask_cors import CORS  # comment this on deployment
from flask_sqlalchemy import SQLAlchemy
from os import path
import uuid
import json
from datetime import datetime

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    # say where db is going to be stored (name = faq_db.db)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///faq_db.db'
    db.init_app(app)  # connect flask app with database

    # need models to load/run before calling create_all()
    from .models import Course, Question, Owner

    DB_PATH = 'instance/faq_db.db'

    # if db doesn't exist, create it
    if not path.exists(DB_PATH):
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
                    'courseId': course.id,
                    'isAdmin': Course.is_admin_for_course(jsonData['adminKey'], jsonData['courseCode']) or Owner.is_owner(jsonData['adminKey']),
                    'isTA': Course.is_TA_for_course(jsonData['adminKey'], jsonData['courseCode']) or Owner.is_owner(jsonData['adminKey']),
                    'isOwner': Owner.is_owner(jsonData['adminKey']),
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
    @app.route('/course/question/submit', methods=['POST'])
    def ask_question():
        if request.headers.get('Content-Type') == 'application/json': # ensure valid Content-Type
            jsonData = request.json
            question = Question(title=jsonData['title'], content=jsonData['content'], submitted_by=jsonData['submittedBy'], course_id=jsonData['courseId'])
            db.session.add(question)
            db.session.commit()
            return {
                'message': 'Question successfully submitted.',
                'id': question.id,
                'status': 201
            }
        else: # invalid Content-Type
            return {
                'message': 'Content-Type not supported!',
                'status': 400
            }

    # questions answered in this course
    @app.route('/course/questions', methods=['GET'])
    def get_questions():
        course_code = request.args.get('courseCode')
        course = Course.query.filter_by(course_code=course_code).first()

        if course: # only proceed if course code is valid
            questions = Question.query.filter_by(course_id=course.id).order_by(Question.created_at).all()
            
            data = [] # response data
            for idx, question in enumerate(questions):
                data.append({ # populate data dictionary
                    'id': question.id,
                    'title': question.title,
                    'content': question.content,
                    'upVotes': question.up_votes,
                    'submittedBy': question.submitted_by,
                    'isAnswered': question.is_answered,
                    'isImportantQuestion': question.is_important_question,
                    'createdAt': str(question.created_at.strftime('%I:%M %p, %d %b %Y'))
                })
            
            return json.dumps({
                'message': 'Request successful. Sending data.',
                'data': data,
                'status': 200
            })
        else:
            return {
                'message': 'Invalid course code!',
                'data': 'None',
                'status': 400
            }

    # mark as answered
    @app.route('/course/question/mark-as-answered', methods=['POST'])
    def mark_as_answered():
        if request.headers.get('Content-Type') == 'application/json': # ensure valid Content-Type
            data = request.json
            if data['isAdmin'] or data['isTa'] or data['isOwner']:
                question = Question.query.get(data['id'])

                # increment answer count on this question's course
                course = Course.query.get(question.course_id)
                course.questions_answered += 1
                
                # delete question since it is no longer needed
                db.session.delete(question)
                db.session.commit()
                return {
                    'message': 'Successfully marked question as answered.',
                    'id': data['id'],
                    'status': 200
                }
            else: # not authorized
                return {
                    'message': 'You are not authorized to perform this action',
                    'status': 403
                }
        else: # invalid Content-Type
            return {
                'message': 'Content-Type not supported!',
                'status': 400
            }

    # get number of answered questions
    @app.route('/course/questions/num-answered', methods=['GET'])
    def get_question_count():
        params = dict(request.args)
        if 'courseCode' in params: # ensure courseCode is in params
            course_code = params['courseCode']
            course = Course.query.filter_by(course_code=course_code).first()
            
            if course: # only proceed if course code is valid
                return {
                    'count': course.questions_answered,
                    'status': 200
                }
            else:
                return {
                    'message': 'Invalid course code!',
                    'data': 'None',
                    'status': 400
                }
        else: # user did not send course code
            return {
                'message': 'Missing parameter: courseCode',
                'status': 400
            }
                
    # delete a question
    @app.route('/course/question/delete', methods=['DELETE'])
    def delete_question():
        if request.headers.get('Content-Type') == 'application/json': # ensure valid Content-Type
            data = request.json
            if data['isAdmin'] or data['isTa'] or data['isOwner']:
                params = dict(request.args)
                if 'id' in params: # make sure params have id
                    question = Question.query.get(params['id'])
                    db.session.delete(question)
                    db.session.commit()

                    return {
                        'message': 'Successfully deleted question',
                        'id': params['id'],
                        'status': 200
                    }
                else: # handle id param not sent
                    return {
                        'message': 'Missing parameter: id',
                        'status': 400
                    }
            else: # not authorized
                return {
                    'message': 'You are not authorized to perform this action',
                    'status': 403
                }
        else: # invalid Content-Type
            return {
                'message': 'Content-Type not supported!',
                'status': 400
            }

    return app

