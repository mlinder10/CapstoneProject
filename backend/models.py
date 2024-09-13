import random
import uuid

from flask import json
from storage.database import supabase
import typing as t

CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"


class Classroom:
    def __init__(self, id: str, name: str, code: str):
        self.id = id
        self.name = name
        self.code = code

    @staticmethod
    def new(name: str) -> t.Self:
        return Classroom(str(uuid.uuid4()), name, Classroom.create_code())

    @staticmethod
    def create_code() -> str:
        return "".join(random.choices(CODE_CHARS, k=6))

    @staticmethod
    def query() -> t.List[t.Self]:
        return map(lambda x: Classroom(x['id'], x['name'], x['code']), supabase.table('classrooms').select(
            '*').execute().data)

    def insert(self):
        supabase.table('classrooms').insert(
            {'id': self.id, 'name': self.name, 'code': self.code}).execute()

    def json(self) -> t.Dict[str, t.Any]:
        return {'id': self.id, 'name': self.name, 'code': self.code}


class ProblemSet:
    def __init__(self, id: str, name: str, classroom_id: str):
        self.id = id
        self.name = name
        self.classroom_id = classroom_id

    @staticmethod
    def new(name: str, classroom_id: str) -> t.Self:
        return ProblemSet(str(uuid.uuid4()), name, classroom_id)

    @staticmethod
    def query(classroom_id: str) -> t.List[t.Self]:
        return map(lambda x: ProblemSet(x['id'], x['name'], x['classroom_id']), supabase.table('problem_sets').select(
            '*').eq('classroom_id', classroom_id).execute().data)

    def insert(self):
        supabase.table('problem_sets').insert(
            {'id': self.id, 'name': self.name, 'classroom_id': self.classroom_id}).execute()

    def json(self) -> t.Dict[str, t.Any]:
        return {'id': self.id, 'name': self.name, 'classroom_id': self.classroom_id}


def fetch_questions(problem_set_id: str) -> t.List[t.Self]:
    return MultipleChoiceQuestion.query(problem_set_id)

# Question Types


class MultipleChoiceQuestion:
    def __init__(self, id: str, problem_set_id: str, image: str, text: str, answer: str, choices: t.List[str]):
        self.id = id
        self.problem_set_id = problem_set_id
        self.image = image
        self.text = text
        self.answer = answer
        self.choices = choices
        self.type = 'multiple_choice'

    @staticmethod
    def new(problem_set_id: str, image: str, text: str, answer: str, choices: t.List[str]) -> t.Self:
        return MultipleChoiceQuestion(str(uuid.uuid4()), problem_set_id, image, text, answer, choices)

    @staticmethod
    def query(problem_set_id: str) -> t.List[t.Self]:
        return map(lambda x: MultipleChoiceQuestion(x['id'], x['problem_set_id'], x['image'], x['text'], x['answer'], json.loads(x['choices'])), supabase.table('mc_questions').select(
            '*').eq('problem_set_id', problem_set_id).execute().data)

    def insert(self):
        choices = json.dumps(self.choices)
        supabase.table('mc_questions').insert(
            {'id': self.id, 'problem_set_id': self.problem_set_id, 'image': self.image, 'text': self.text, 'answer': self.answer, 'choices': choices}).execute()

    def json(self) -> t.Dict[str, t.Any]:
        return {'id': self.id, 'problemSetId': self.problem_set_id, 'type': self.type, 'image': self.image, 'text': self.text, 'answer': self.answer, 'choices': self.choices}


class MatchingQuestion:
    def __init__(self, id: str, problem_set_id: str, type: str, relations: t.List[t.Tuple[str, str]]):
        self.id = id
        self.problem_set_id = problem_set_id
        self.type = type
        self.relations = relations

    @staticmethod
    def new(problem_set_id: str, type: str, relations: t.List[t.Tuple[str, str]]) -> t.Self:
        return MatchingQuestion(str(uuid.uuid4()), problem_set_id, type, relations)

    @staticmethod
    def query(problem_set_id: str) -> t.List[t.Self]:
        return map(lambda x: MatchingQuestion(x['id'], x['problem_set_id'], x['type'], json.loads(x['relations'])), supabase.table('matching_questions').select(
            '*').eq('problem_set_id', problem_set_id).execute().data)

    def insert(self):
        relations = json.dumps(self.relations)
        supabase.table('matching_questions').insert(
            {'id': self.id, 'problem_set_id': self.problem_set_id, 'type': self.type, 'relations': relations}).execute()

    def json(self) -> t.Dict[str, t.Any]:
        return {'id': self.id, 'problemSetId': self.problem_set_id, 'type': self.type, 'relations': self.relations}


class WordQuestion:
    def __init__(self, id: str, problem_set_id: str, type: str, prompt: str, answers: t.List[str]):
        self.id = id
        self.problem_set_id = problem_set_id
        self.type = type
        self.prompt = prompt
        self.answers = answers

    @staticmethod
    def new(problem_set_id: str, type: str, prompt: str, answers: t.List[str]) -> t.Self:
        return WordQuestion(str(uuid.uuid4()), problem_set_id, type, prompt, answers)

    @staticmethod
    def query(problem_set_id: str) -> t.List[t.Self]:
        return map(lambda x: WordQuestion(x['id'], x['problem_set_id'], x['type'], x['prompt'], json.loads(x['answers'])), supabase.table('word_questions').select(
            '*').eq('problem_set_id', problem_set_id).execute().data)

    def insert(self):
        answers = json.dumps(self.answers)
        supabase.table('word_questions').insert(
            {'id': self.id, 'problem_set_id': self.problem_set_id, 'type': self.type, 'prompt': self.prompt, 'answers': answers}).execute()

    def json(self) -> t.Dict[str, t.Any]:
        return {'id': self.id, 'problemSetId': self.problem_set_id, 'type': self.type, 'prompt': self.prompt, 'answers': self.answers}


class FillBlankQuestion:
    def __init__(self, id: str, problem_set_id: str, type: str, prompt: str, blank_indices: t.List[int], choices: t.List[str]):
        self.id = id
        self.problem_set_id = problem_set_id
        self.type = type
        self.prompt = prompt
        self.blank_indices = blank_indices
        self.choices = choices

    @staticmethod
    def new(problem_set_id: str, type: str, prompt: str, blank_indices: t.List[int], choices: t.List[str]) -> t.Self:
        return FillBlankQuestion(str(uuid.uuid4()), problem_set_id, type, prompt, blank_indices, choices)

    @staticmethod
    def query(problem_set_id: str) -> t.List[t.Self]:
        return map(lambda x: FillBlankQuestion(x['id'], x['problem_set_id'], x['type'], x['prompt'], json.loads(x['blank_indices']), json.loads(x['choices'])), supabase.table('fill_blank_questions').select(
            '*').eq('problem_set_id', problem_set_id).execute().data)

    def insert(self):
        choices = json.dumps(self.choices)
        blank_indices = json.dumps(self.blank_indices)
        supabase.table('fill_blank_questions').insert(
            {'id': self.id, 'problem_set_id': self.problem_set_id, 'type': self.type, 'prompt': self.prompt, 'blank_indices': blank_indices, 'choices': choices}).execute()

    def json(self) -> t.Dict[str, t.Any]:
        return {'id': self.id, 'problemSetId': self.problem_set_id, 'type': self.type, 'prompt': self.prompt, 'blankIndices': self.blank_indices, 'choices': self.choices}
