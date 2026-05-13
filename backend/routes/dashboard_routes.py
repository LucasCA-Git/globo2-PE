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
                "regional": "Recife",
                "status": "Editando",

                "programa": "NE1",
                "retranca": "Acidente na BR",

                "projeto": "NE1 - Acidente na BR",

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
                "regional": "Rio de Janeiro",
                "status": "Editando",

                "programa": "BDPE",
                "retranca": "Hospital Lotado",

                "projeto": "BDPE - Hospital Lotado",

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
                "regional": "São Paulo",
                "status": "Pronto para editar",

                "programa": "GEPE",
                "retranca": "Gols do Sport",

                "projeto": "GEPE - Gols do Sport",

                "progresso": 12,
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
                "regional": "Brasília",
                "status": "Home Office",

                "programa": "BOLETIM NE2",
                "retranca": "Previsão do Tempo",

                "projeto": "BOLETIM NE2 - Previsão do Tempo",

                "progresso": 86,
                "inicio": "09:11",
                "arquivoGb": 0.8,
                "previsaoRestanteMin": 9,
                "previsaoFim": "10:21"
            },

            {
                "id": 5,
                "editor": "Lucas Martins",
                "avatar": "LM",
                "ilha": "ILHA-08",
                "regional": "Recife",
                "status": "Gaveta",

                "programa": "NE2",
                "retranca": "Série Especial",

                "projeto": "NE2 - Série Especial",

                "progresso": 100,
                "inicio": "07:20",
                "arquivoGb": 3.1,
                "previsaoRestanteMin": 0,
                "previsaoFim": "Finalizado"
            },

            {
                "id": 6,
                "editor": "Camila Rocha",
                "avatar": "CR",
                "ilha": "ILHA-10",
                "regional": "Rio de Janeiro",
                "status": "Fora do Turno",

                "programa": "NE1",
                "retranca": "Entrevista Exclusiva",

                "projeto": "NE1 - Entrevista Exclusiva",

                "progresso": 0,
                "inicio": "--:--",
                "arquivoGb": 0,
                "previsaoRestanteMin": 0,
                "previsaoFim": "--:--"
            }
        ],

        "ia": {
            "fila": [
                {
                    "id": 1,
                    "editor": "João Silva",
                    "projeto": "NE1 - Acidente na BR",
                    "horario": "10:36",
                    "restanteMin": 24
                },

                {
                    "id": 2,
                    "editor": "Ana Oliveira",
                    "projeto": "GEPE - Gols do Sport",
                    "horario": "11:20",
                    "restanteMin": 58
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