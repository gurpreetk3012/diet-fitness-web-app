from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import bcrypt

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
    app.config["JWT_SECRET_KEY"] = "your_secret_key_here"
    
    db.init_app(app)
    jwt = JWTManager(app)

    from .routes import auth_routes, bmi_bp, meal_bp
    
    app.register_blueprint(bmi_bp)
    app.register_blueprint(auth_routes)
    app.register_blueprint(meal_bp)
    
    @app.route('/')
    def home():
        return {"message": "Welcome to Personalized Diet & Fitness API"}

    return app