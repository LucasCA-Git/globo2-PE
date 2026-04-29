from flask import Flask, request , jsonify
from flask_cors import CORS
from routes.health_routes import health_bp
from routes.dashboard_routes import dashboard_bp
from routes.event_routes import event_bp

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def buscar_ilha_no_banco(caminho):
    # EXEMPLO MOCK (simulação)
    return {
        "id": 1,
        "editor": "João",
        "avatar": "avatar.png",
        "ilha": "Ilha 1"
    }

def calcular_progresso(evento):

     # exemplo
    return 50 

@app.route("/atualizar", methods=['PUT'])
def transformar_evento_para_ilha():
    evento = request.json

    dados_db = buscar_ilha_no_banco(evento["caminho"])

    resposta = {
        "id": dados_db["id"],
        "editor": dados_db["editor"],
        "avatar": dados_db["avatar"],
        "ilha": dados_db["ilha"],
        "status": "Ocupado",
        "projeto": evento["arquivo"],
        "progresso": calcular_progresso(evento),
    }

    return jsonify(resposta)

if __name__ == "__main__":
    app.run(debug=True, port=5000)