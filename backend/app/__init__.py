from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    
    db.init_app(app)

    from .routes import auth_routes
    from .routes import bmi_bp
    from .routes import meal_bp
    
    app.register_blueprint(bmi_bp)
    app.register_blueprint(auth_routes)
    app.register_blueprint(meal_bp)
    
    @app.route('/')
    def home():
        return {"message": "Welcome to Personalized Diet & Fitness API"}

    return app