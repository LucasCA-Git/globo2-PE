"""
data_ia/etl_process.py
Worker que consome eventos do Redis e persiste métricas no PostgreSQL.
Também marca sessões como ociosas após timeout sem save.
"""

import os
import time
import json
import logging
from datetime import datetime, timezone, timedelta

import redis
import psycopg2
import psycopg2.extras

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [ETL] %(levelname)s - %(message)s",
)
log = logging.getLogger(__name__)

REDIS_URL    = os.getenv("REDIS_URL", "redis://localhost:6379")
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://globo:globo123@localhost:5432/media_compose")
IDLE_TIMEOUT = int(os.getenv("IDLE_TIMEOUT_SECONDS", "300"))
CHECK_INTERVAL = int(os.getenv("CHECK_INTERVAL_SECONDS", "30"))

redis_client = redis.from_url(REDIS_URL, decode_responses=True)


def get_conn():
    return psycopg2.connect(DATABASE_URL, cursor_factory=psycopg2.extras.RealDictCursor)


def marcar_sessoes_ociosas():
    """
    Verifica sessões ativas no PostgreSQL.
    Se o último save foi há mais de IDLE_TIMEOUT segundos, marca como ocioso.
    """
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE edicoes
                SET    status = 'ocioso'
                WHERE  status = 'ativo'
                  AND  ultimo_save < NOW() - INTERVAL '%s seconds'
                RETURNING id, editor_nome, arquivo
                """,
                (IDLE_TIMEOUT,),
            )
            ociosas = cur.fetchall()
            conn.commit()

            for s in ociosas:
                log.info(
                    "Sessão marcada como ociosa: editor=%s arquivo=%s id=%s",
                    s["editor_nome"], s["arquivo"], s["id"],
                )
                # Remove do Redis também
                key = f"editor:{s['editor_nome'].lower().replace(' ', '_')}"
                redis_client.delete(key)

    except Exception as exc:
        conn.rollback()
        log.error("Erro ao marcar sessões ociosas: %s", exc)
    finally:
        conn.close()


def calcular_metricas_diarias():
    """
    Agrega métricas de produtividade do dia anterior no PostgreSQL.
    Roda uma vez por ciclo — dados usados pela IA para retreinar.
    """
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT
                    editor_nome,
                    COUNT(*)                             AS total_sessoes,
                    AVG(duracao_segundos)                AS media_duracao_seg,
                    AVG(tamanho_arquivo_mb)              AS media_tamanho_mb,
                    SUM(duracao_segundos)                AS total_segundos,
                    DATE(inicio_edicao)                  AS data_edicao
                FROM   edicoes
                WHERE  status            = 'encerrado'
                  AND  duracao_segundos  IS NOT NULL
                  AND  DATE(inicio_edicao) = CURRENT_DATE - 1
                GROUP BY editor_nome, DATE(inicio_edicao)
                """,
            )
            metricas = cur.fetchall()
            if metricas:
                log.info("Métricas do dia anterior calculadas para %d editores.", len(metricas))
            else:
                log.debug("Sem sessões encerradas ontem para agregar.")

    except Exception as exc:
        log.error("Erro ao calcular métricas: %s", exc)
    finally:
        conn.close()


def main():
    log.info("Worker ETL iniciado. Verificando a cada %ds.", CHECK_INTERVAL)
    log.info("Timeout de ociosidade: %ds", IDLE_TIMEOUT)

    ciclos = 0
    while True:
        try:
            marcar_sessoes_ociosas()

            # Calcula métricas uma vez por hora (a cada 120 ciclos com intervalo 30s)
            ciclos += 1
            if ciclos % 120 == 0:
                calcular_metricas_diarias()
                ciclos = 0

        except Exception as exc:
            log.error("Erro no ciclo ETL: %s", exc)

        time.sleep(CHECK_INTERVAL)


if __name__ == "__main__":
    main()