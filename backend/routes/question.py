from flask import jsonify, request
from flask_restful import Resource
from models import MultipleChoiceQuestion, MatchingQuestion, WordQuestion, FillBlankQuestion, fetch_questions


class QuestionRoute(Resource):
    def get(self, problem_set_id):
        questions = fetch_questions(problem_set_id)
        json_questions = []
        for question in questions:
            json_questions.append(question.json())
        return jsonify(json_questions)

    def post(self, problem_set_id):
        data = request.get_json()
        match type:
            case 'multiple_choice':
                question = MultipleChoiceQuestion.new(
                    problem_set_id, data['image'], data['text'], data['answer'], data['choices'])
                question.insert()
                return jsonify(question.json())
            case 'matching':
                question = MatchingQuestion.new(
                    problem_set_id, data['type'], data['relations'])
                question.insert()
                return jsonify(question.json())
            case 'word':
                question = WordQuestion.new(
                    problem_set_id, data['prompt'], data['answers'])
                question.insert()
                return jsonify(question.json())
            case 'fill_blank':
                question = FillBlankQuestion.new(
                    problem_set_id, data['prompt'], data['answers'])
                question.insert()
                return jsonify(question.json())
            case _:
                return "Invalid question type", 400
