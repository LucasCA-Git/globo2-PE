# from flask import Blueprint, request, jsonify

# event_bp = Blueprint("events", __name__)

# @event_bp.route("/events", methods=["POST"])
# def receive_event():
#     data = request.get_json()

#     print("Evento recebido do Watchdog:")
#     print(data)

#     return jsonify({
#         "status": "ok",
#         "message": "Evento recebido com sucesso",
#         "data": data
#     }), 200


# Ela pega o payload recebido do Watchdog e salva no Redis usando a chave ultimo_evento.

from flask import Blueprint, request, jsonify
from database import redis_client
import json

event_bp = Blueprint("events", __name__)

@event_bp.route("/events", methods=["POST"])
def receive_event():
    data = request.get_json()

    redis_client.set("ultimo_evento", json.dumps(data))

    print("Evento recebido do Watchdog:")
    print(data)

    return jsonify({
        "status": "ok",
        "message": "Evento recebido com sucesso",
        "data": data
    }), 200
