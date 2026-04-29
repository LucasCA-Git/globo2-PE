import json
import os
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from redis_config import redis_client

class Monitorar(FileSystemEventHandler):

    def processar_evento(self, event):
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