from io import BytesIO
from base64 import b64decode
from PIL import Image
from DECIMER import predict_smiles
from flask import request
from flask_restful import Resource


def img_from_b64(b64: str) -> Image:
    return Image.open(BytesIO(b64decode(b64)))


class DrawRoute(Resource):
    def post(self):
        body = request.get_json()
        img = img_from_b64(body['image'])
        smiles = predict_smiles(img)
        return smiles
