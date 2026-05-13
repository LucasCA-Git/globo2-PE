import json
import os
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from redis_config import redis_client
import time

class Monitorar(FileSystemEventHandler):

    def __init__(self):
        self.ultimos_eventos = {}
        self.intervalo = 1  

    def evento_duplicado(self, event):
        chave = (event.event_type, event.src_path)

        agora = time.time()

        if chave in self.ultimos_eventos:
            ultimo_tempo = self.ultimos_eventos[chave]

            if agora - ultimo_tempo < self.intervalo:
                return True

        self.ultimos_eventos[chave] = agora

        return False
    
    def processar_evento(self, event):

        if event.is_directory:
            return
        
        if self.evento_duplicado(event):
            return
        evento = {
            "tipo": event.event_type,
            "caminho": event.src_path,
            "arquivo": os.path.basename(event.src_path),
            "diretorio": event.is_directory,
            "timestamp": datetime.utcnow().isoformat()
        }

        redis_client.rpush("eventos_watchdog", json.dumps(evento))

    def on_any_event(self, event):
        self.processar_evento(event)    

def iniciar_watchdog(pasta):
    observer = Observer()
    handler = Monitorar()

    observer.schedule(handler, path=pasta, recursive=True)
    observer.start()

    return observer

if __name__ == "__main__":
    pasta_monitorada = "./arquivos"

    observer = iniciar_watchdog(pasta_monitorada)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()