import os
import sys

command = sys.argv[1] if len(sys.argv) > 1 else ""

if command == "up":
    os.system("docker compose up -d --build")
elif command == "down":
    os.system("docker compose down")
elif command == "destroy":
    os.system("docker compose down -v")
elif command == "logs":
    os.system("docker compose logs -f backend")
elif command == "ps":
    os.system("docker ps")
else:
    print("""
Comandos disponíveis:

python manage.py up
python manage.py down
python manage.py destroy
python manage.py logs
python manage.py ps
""")
