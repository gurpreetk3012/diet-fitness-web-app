from flask import Blueprint, request, jsonify
from utils.bmi_bmr import calculate_bmi, calculate_bmr
from utils.meal_plan_recommendation import recommend_meals, final_df
from . models import User
from . import db

auth_routes = Blueprint("auth_routes", __name__)
bmi_bp = Blueprint('bmi_bp', __name__)
meal_bp = Blueprint("meal_bp", __name__)

# Test Message
@auth_routes.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend running successfully!"})

# User Registration
@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    age = data.get("age")
    height = data.get("height")
    weight = data.get("weight")
    gender = data.get("gender")

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered"}), 400

    new_user = User(
        name=name,
        email=email,
        password=password,
        age=age,
        height=height,
        weight=weight,
        gender=gender
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "message": "User registered successfully",
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "age": new_user.age,
        "height": new_user.height,
        "weight": new_user.weight,
        "gender": new_user.gender
    }), 201

# User Login
@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "age": user.age,
        "height": user.height,
        "weight": user.weight,
        "gender": user.gender
    }), 200
    
# Dashboard BMI/BMR API
@bmi_bp.route('/bmi_bmr/dashboard', methods=['GET'])
def get_bmi_bmr_dashboard():
    email = request.args.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    bmi, status = calculate_bmi(user.weight, user.height)
    bmr = calculate_bmr(user.weight, user.height, user.age, user.gender)
    return jsonify({
        'bmi': bmi,
        'bmi_status': status,
        'bmr': bmr
    })

# BMI calculator for arbitrary inputs
@bmi_bp.route('/bmi/calculate', methods=['POST'])
def calculate_bmi_api():
    data = request.get_json()
    weight = float(data.get('weight'))
    height = float(data.get('height'))
    bmi, status = calculate_bmi(weight, height)
    return jsonify({"bmi": bmi, "status": status})

# BMR calculator for arbitrary inputs
@bmi_bp.route('/bmr/calculate', methods=['POST'])
def calculate_bmr_api():
    data = request.get_json()
    weight = float(data.get('weight'))
    height = float(data.get('height'))
    age = int(data.get('age'))
    gender = data.get('gender')
    bmr = calculate_bmr(weight, height, age, gender)
    return jsonify({"bmr": bmr})
    
# Meal Recommendation System
@meal_bp.route('/api/recommend-meals', methods=['POST'])
def recommend_meals_api():
    try:
        data = request.get_json(force=True)
        calorie_target = data.get("calorie_target")
        diet_type = data.get("diet")
        course = data.get("course")
        flavor = data.get("flavor")
        top_n = data.get("top_n", 5)

        results = recommend_meals(
            user_preferences=data,
            dataframe=final_df,
            calorie_target=calorie_target,
            diet_type=diet_type,
            course=course,
            flavor=flavor,
            top_n=top_n
        )

        if results.empty:
            return jsonify({"message": "No matching meals found"}), 404

        return jsonify(results.to_dict(orient="records"))

    except Exception as e:
        return jsonify({"error": str(e)}), 500
