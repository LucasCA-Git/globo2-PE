from flask import Blueprint, jsonify
from datetime import datetime

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/dashboard", methods=["GET"])
def get_dashboard():
    return jsonify({
        "atualizadoEm": datetime.now().strftime("%H:%M:%S"),
        "statusSistema": "Online Flask",
        "summary": {
            "totalIlhas": 6,
            "ilhasAtivas": 4,
            "tempoMedioMin": 84,
            "concluidosHoje": 5
        },
        "ilhas": [
            {
                "id": 1,
                "editor": "João Silva",
                "avatar": "JS",
                "ilha": "ILHA-01",
                "status": "Ocupado",
                "projeto": "Jornal Nacional - Bloco 2",
                "progresso": 64,
                "inicio": "09:26",
                "arquivoGb": 2.4,
                "previsaoRestanteMin": 24,
                "previsaoFim": "10:36"
            },
            {
                "id": 2,
                "editor": "Maria Santos",
                "avatar": "MS",
                "ilha": "ILHA-02",
                "status": "Ocupado",
                "projeto": "Fantástico - VT Especial",
                "progresso": 73,
                "inicio": "08:11",
                "arquivoGb": 5.6,
                "previsaoRestanteMin": 44,
                "previsaoFim": "10:56"
            },
            {
                "id": 3,
                "editor": "Ana Oliveira",
                "avatar": "AO",
                "ilha": "ILHA-04",
                "status": "Livre",
                "projeto": "Globo Esporte - Gols",
                "progresso": 67,
                "inicio": "09:41",
                "arquivoGb": 1.2,
                "previsaoRestanteMin": 14,
                "previsaoFim": "10:26"
            },
            {
                "id": 4,
                "editor": "Juliana Ferreira",
                "avatar": "JF",
                "ilha": "ILHA-06",
                "status": "Livre",
                "projeto": "Bom Dia Brasil - Matéria",
                "progresso": 86,
                "inicio": "09:11",
                "arquivoGb": 0.8,
                "previsaoRestanteMin": 9,
                "previsaoFim": "10:21"
            }
        ],
        "ia": {
            "fila": [
                {
                    "id": 1,
                    "editor": "João Silva",
                    "projeto": "Jornal Nacional - Bloco 2",
                    "horario": "10:36",
                    "restanteMin": 24
                },
                {
                    "id": 2,
                    "editor": "Maria Santos",
                    "projeto": "Fantástico - VT Especial",
                    "horario": "10:56",
                    "restanteMin": 44
                }
            ],
            "precisaoModelo": 94.2,
            "dadosTreinamento": 3847
        },
        "horasPorDia": [
            {"label": "Seg", "valor": 32},
            {"label": "Ter", "valor": 41},
            {"label": "Qua", "valor": 45},
            {"label": "Qui", "valor": 38},
            {"label": "Sex", "valor": 52},
            {"label": "Sáb", "valor": 18},
            {"label": "Dom", "valor": 10}
        ],
        "atividadePorHora": [
            {"label": "08h", "valor": 8},
            {"label": "09h", "valor": 15},
            {"label": "10h", "valor": 18},
            {"label": "11h", "valor": 17},
            {"label": "12h", "valor": 10},
            {"label": "13h", "valor": 7},
            {"label": "14h", "valor": 11},
            {"label": "15h", "valor": 16}
        ]
    })