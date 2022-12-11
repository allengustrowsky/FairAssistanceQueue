from flask import Flask
from flask_cors import CORS  # comment this on deployment
from flask_sqlalchemy import SQLAlchemy
from os import path
# import course

# from models import Course, Question

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    # say where db is going to be stored (name = faq_db.db)
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///faq_db.db'
    db.init_app(app)  # connect flask app with database

    from .models import Course # need models to load/run before calling create_all()
   
    
    # if db doesn't exist, create it
    if not path.exists('instance/faq_db.db'):
        with app.app_context():
            db.create_all()
        print('Database successfully created')
    else:
        print('Database exists')

    CORS(app)
    # register routes
    # from course import course
    # from . import 


    @app.route("/members")
    def members():
        new_course = Course(name='Members of the app', admin_key='4', ta_key='4')
        db.session.add(new_course)
        db.session.commit()
        # flash('success!', category='success')
        return {"members": ["Member1", "Member2", "Member3"]}

    @app.route("/course/index")
    def index():
        return {"message": "success!!"}

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