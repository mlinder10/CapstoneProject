import base64
from flask import request
from flask_restful import Resource


class DrawingRoute(Resource):
    def post(self):
        data = request.get_json()
        path = 'tmp.png'
        save_base64_image(data, path)
        smiles = 'undefined'
        try:
            smiles = predict_SMILES(path)
        except:
            smiles = 'error'
        return smiles


def save_base64_image(data: str, path: str):
    bytes = base64.b64decode(data)
    with open(path, 'wb') as f:
        f.write(bytes)
