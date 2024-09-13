from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from routes.question import QuestionRoute
from routes.problemset import ProblemSetRoute
from routes.classroom import ClassroomRoute

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)


api.add_resource(ClassroomRoute, '/classrooms')
api.add_resource(ProblemSetRoute, "/sets/<classroom_id>")
api.add_resource(QuestionRoute, "/questions/<problem_set_id>")


@app.route('/professor', methods=['GET'])
# frontend
def serve_html():
    return app.send_static_file('dist/index.html')


if __name__ == '__main__':
    app.run()
