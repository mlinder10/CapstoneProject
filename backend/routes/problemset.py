from flask import jsonify, request
from flask_restful import Resource
from models import ProblemSet


class ProblemSetRoute(Resource):
    def get(self, classroom_id):
        sets = ProblemSet.query(classroom_id)
        json_sets = []
        for set in sets:
            json_sets.append(set.json())
        return jsonify(json_sets)

    def post(self, classroom_id):
        data = request.get_json()
        problem_set = ProblemSet.new(data['name'], classroom_id)
        problem_set.insert()
        return jsonify(problem_set.json())
