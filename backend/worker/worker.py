import redis, json , psycopg2 , time

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def coneccao_db():
    return psycopg2.connect(
        host= "",
        database= "",
        user= "",
        password= "",
        port= ""
    )

def exporta_para_db(evento):
    conn = coneccao_db()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO eventos (tipo, caminho , arquivo, diretorio, timestamp) VALUES (%s, %s, %s, %s, %s)",
        (evento["tipo"], evento["caminho"], evento["arquivo"], evento["diretorio"], evento["timestamp"])
    )

    conn.commit()
    cursor.close()
    conn.close()

while True:
    evento = r.lpop("eventos_watchdog")

    if evento:
        evento_json = json.loads(evento)
        exporta_para_db(evento_json)
    else: time.sleep(1)