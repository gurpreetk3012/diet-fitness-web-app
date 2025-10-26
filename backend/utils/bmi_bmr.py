def calculate_bmi(weight, height):
    """
    Calculate BMI (Body Mass Index)
    weight: in kilograms
    height: in centimeters
    """
    height_m = height / 100  # converts cm to meters
    bmi = weight / (height_m ** 2)
    
    # BMI classification
    
    if bmi < 18.5:
        status = "Underweight"
    elif 18.5 <= bmi < 24.9:
        status = "Normal weight"
    elif 25 <= bmi < 29.9:
        status = "Overweight"
    else:
        status = "Obese"
    
    return round(bmi, 2), status


def calculate_bmr(weight, height, age, gender):
    """
    Calculate BMR (Basal Metabolic Rate)
    Mifflin–St Jeor Equation
    weight: kg, height: cm, age: years
    gender: 'male' or 'female'
    """
    if gender.lower() == 'male':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161

    return round(bmr, 2)