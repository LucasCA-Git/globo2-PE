import time
import os
import requests
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

BACKEND_URL      = "http://127.0.0.1:5000/events"
PASTA_MONITORADA = "./arquivos_teste"

USUARIO_MAP = {
    "LUC":    "Lucas Cardoso Alecrim",
    "SAM":    "Samuel Santos",
    "SAMUEL": "Samuel Santos",
    "JOA":    "João Oliveira",
    "ANA":    "Ana Paula Ferreira",
}


def extrair_info_pasta(caminho_arquivo: str) -> dict:
    abs_monitorada = os.path.abspath(PASTA_MONITORADA)
    abs_arquivo    = os.path.abspath(caminho_arquivo)
    try:
        rel    = os.path.relpath(abs_arquivo, abs_monitorada)
        partes = rel.split(os.sep)
    except ValueError:
        return {}
    if len(partes) < 2:
        return {}
    pasta_nome = partes[0]
    tokens     = pasta_nome.split()
    if not tokens:
        return {}
    codigo  = tokens[0].upper()
    usuario = USUARIO_MAP.get(codigo, codigo)
    projeto = " ".join(tokens[1:]) if len(tokens) > 1 else ""
    return {"pasta": pasta_nome, "usuario": usuario, "projeto": projeto}


class MonitorHandler(FileSystemEventHandler):

    def __init__(self):
        self.ultimos_eventos = {}
        self.intervalo = 1

    def evento_duplicado(self, event):
        chave = (event.event_type, event.src_path)
        agora = time.time()
        if chave in self.ultimos_eventos:
            if agora - self.ultimos_eventos[chave] < self.intervalo:
                return True
        self.ultimos_eventos[chave] = agora
        return False

    def processar_evento(self, event):
        if event.is_directory or self.evento_duplicado(event):
            return

        info = extrair_info_pasta(event.src_path)

        payload = {
            "tipoEvento": event.event_type,
            "arquivo":    os.path.basename(event.src_path),
            "caminho":    os.path.abspath(event.src_path),
            "diretorio":  event.is_directory,
            "timestamp":  time.strftime("%Y-%m-%d %H:%M:%S"),
            "pasta":      info.get("pasta",   ""),
            "usuario":    info.get("usuario", ""),
            "projeto":    info.get("projeto", ""),
        }

        try:
            response = requests.post(BACKEND_URL, json=payload, timeout=5)
            print(f"[OK] {payload['tipoEvento'].upper():10} | {payload['arquivo']}")
            print(f"     usuario={payload['usuario']} | projeto={payload['projeto']}")
            print(f"     backend={response.status_code}")
        except requests.RequestException as e:
            print(f"[ERRO] {e}")

    def on_any_event(self, event):
        self.processar_evento(event)


if __name__ == "__main__":
    os.makedirs(PASTA_MONITORADA, exist_ok=True)
    handler  = MonitorHandler()
    observer = Observer()
    observer.schedule(handler, PASTA_MONITORADA, recursive=True)
    observer.start()
    print(f"[WATCHDOG] Monitorando: {os.path.abspath(PASTA_MONITORADA)}")
    print(f"[WATCHDOG] Backend: {BACKEND_URL}\n")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\n[WATCHDOG] Encerrado.")
    observer.join()