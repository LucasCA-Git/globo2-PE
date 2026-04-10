import time
import os
import requests
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

BACKEND_URL = "http://127.0.0.1:5000/events"
PASTA_MONITORADA = "./arquivos_teste"


class MonitorHandler(FileSystemEventHandler):
    def enviar_evento(self, tipo_evento, caminho_arquivo):
        nome_arquivo = os.path.basename(caminho_arquivo)

        payload = {
            "tipoEvento": tipo_evento,
            "arquivo": nome_arquivo,
            "caminho": os.path.abspath(caminho_arquivo),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }

        try:
            response = requests.post(BACKEND_URL, json=payload, timeout=5)
            print(f"[OK] Evento enviado: {payload}")
            print(f"[OK] Resposta do backend: {response.status_code}")
        except requests.RequestException as e:
            print(f"[ERRO] Falha ao enviar evento: {e}")

    def on_created(self, event):
        if not event.is_directory:
            print(f"[CRIADO] {event.src_path}")
            self.enviar_evento("created", event.src_path)

    def on_modified(self, event):
        if not event.is_directory:
            print(f"[MODIFICADO] {event.src_path}")
            self.enviar_evento("modified", event.src_path)

    def on_deleted(self, event):
        if not event.is_directory:
            print(f"[REMOVIDO] {event.src_path}")
            self.enviar_evento("deleted", event.src_path)


if __name__ == "__main__":
    os.makedirs(PASTA_MONITORADA, exist_ok=True)

    event_handler = MonitorHandler()
    observer = Observer()
    observer.schedule(event_handler, PASTA_MONITORADA, recursive=True)

    observer.start()
    print(f"Monitorando a pasta: {os.path.abspath(PASTA_MONITORADA)}")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("Monitoramento encerrado.")

    observer.join()