from flask import jsonify, request
from flask_restful import Resource
from models import Classroom


class ClassroomRoute(Resource):
    def get(self):
        classrooms = Classroom.query()
        json_classrooms = []
        for classroom in classrooms:
            json_classrooms.append(classroom.json())
        return jsonify(json_classrooms)

    def post(self):
        data = request.get_json()
        classroom = Classroom.new(data['name'])
        classroom.insert()
        return jsonify(classroom.json())
