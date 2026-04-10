from flask import Blueprint, request, jsonify

event_bp = Blueprint("events", __name__)

@event_bp.route("/events", methods=["POST"])
def receive_event():
    data = request.get_json()

    print("Evento recebido do Watchdog:")
    print(data)

    return jsonify({
        "status": "ok",
        "message": "Evento recebido com sucesso",
        "data": data
    }), 200