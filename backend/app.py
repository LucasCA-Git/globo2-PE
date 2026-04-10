from flask import Flask
from flask_cors import CORS
from routes.health_routes import health_bp
from routes.dashboard_routes import dashboard_bp
from routes.event_routes import event_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(health_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(event_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000)