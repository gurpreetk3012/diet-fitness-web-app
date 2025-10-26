# Importing necessary libraries
import pandas as pd
import numpy as np
import re
from thefuzz import process  # Install via: pip install thefuzz

# Loading the datasets
food_df = pd.read_csv("../data/indian_food.csv")
diet_df = pd.read_csv("../data/nutrition_dataset.csv")

# Standardizing column names for consistency
food_df.columns = food_df.columns.str.lower().str.strip()
diet_df.columns = diet_df.columns.str.lower().str.strip()

# Dropping duplicates
food_df.drop_duplicates(inplace=True)
diet_df.drop_duplicates(inplace=True)

# Handling null values in food_df for 'name' column
food_df = food_df.dropna(subset=["name"])

# Selecting only the necessary columns for analysis
food_df = food_df[['name', 'ingredients', 'diet', 'prep_time', 'cook_time', 'flavor_profile', 'course', 'state', 'region']]
diet_df = diet_df[['name', 'food_category', 'calories_per_100g',
                   'protein_per_100g', 'carbs_per_100g', 'fat_per_100g',
                   'fiber_per_100g', 'tags']]

# Creating a mapping for renaming columns in diet_df
column_mapping = {
    'name': 'food_name',
    'food_category': 'category',
    'calories_per_100g': 'calories',
    'protein_per_100g': 'protein',
    'carbs_per_100g': 'carbohydrates',
    'fat_per_100g': 'fat',
    'fiber_per_100g': 'fiber',
    'tags': 'tags',
}

diet_df = diet_df.rename(columns=column_mapping)

# Function to clean and tokenize ingredients into a list
def clean_ingredients(ing):
    if pd.isna(ing):
        return []
    ing = ing.lower()
    # Split by comma or 'and'
    parts = re.split(r',| and ', ing)
    # Remove extra spaces and punctuation
    return [p.strip() for p in parts if p.strip()]

food_df['ingredient_list'] = food_df['ingredients'].apply(clean_ingredients)

# Preparing nutrition lookup dictionary
diet_df['food_name_clean'] = diet_df['food_name'].str.lower().str.strip()
diet_df_unique = diet_df.drop_duplicates(subset=['food_name_clean'])
nutrition_lookup = diet_df_unique.set_index('food_name_clean')[['calories', 'protein', 'carbohydrates', 'fat', 'fiber']].to_dict('index')

print("Nutrition lookup dictionary created successfully.")

# Function to estimate nutrition based on ingredient list
def estimate_nutrition(ingredients, nutrition_lookup, diet_names, cutoff=80):
    total = {'calories': 0, 'protein': 0, 'carbohydrates': 0, 'fat': 0, 'fiber': 0}
    count = 0

    for ing in ingredients:
        match, score = process.extractOne(ing, diet_names)
        if score >= cutoff:
            nutrients = nutrition_lookup.get(match)
            if nutrients:
                for k in total:
                    total[k] += nutrients.get(k, 0)
                count += 1

    # Return average nutrients or totals
    if count > 0:
        for k in total:
            total[k] = round(total[k] / count, 2)
    return total

diet_names = list(nutrition_lookup.keys())

# Estimating nutrition for each food item
food_df['nutrition_estimate'] = food_df['ingredient_list'].apply(
    lambda ings: estimate_nutrition(ings, nutrition_lookup, diet_names)
)

# Splitting the nutrition dictionary into separate columns
nutrition_df = pd.json_normalize(food_df['nutrition_estimate'])
final_df = pd.concat([food_df, nutrition_df], axis=1)
final_df.drop(columns=['nutrition_estimate'], inplace=True)

# Personalized Meal Recommendation Function
def recommend_meals(
    user_preferences,
    dataframe,
    calorie_target=None,
    diet_type=None,
    course=None,
    flavor=None,
    top_n=5
):
    """
    Recommend personalized Indian meals based on user preferences.

    Parameters:
    - user_preferences: dict with keys like calorie_target, diet, course, flavor
    - dataframe: pd.DataFrame containing dish info and nutrition
    - calorie_target: int or None, optional calorie goal
    - diet_type: str or None, diet filter e.g., vegetarian
    - course: str or None, course filter e.g., main course
    - flavor: str or None, flavor filter e.g., spicy
    - top_n: int, number of meal suggestions to return

    Returns:
    - pd.DataFrame of filtered top recommended meals
    """

    df = dataframe.copy()

    # Applying filters based on user input
    if calorie_target:
        df = df[df['calories'] <= calorie_target + 100]  # +/- 100 range
    if diet_type:
        df = df[df['diet'].str.lower() == diet_type.lower()]
    if course:
        df = df[df['course'].str.lower() == course.lower()]
    if flavor:
        df = df[df['flavor_profile'].str.lower() == flavor.lower()]

    # Handling empty result
    if df.empty:
        print("⚠️ No matching meals found for given preferences.")
        return pd.DataFrame()

    # Rank by closest to calorie_target if provided
    if calorie_target:
        df['calorie_diff'] = abs(df['calories'] - calorie_target)
        df = df.sort_values(by='calorie_diff', ascending=True)

    # Return top N recommendations
    result = df.head(top_n)[
        ['name', 'diet', 'course', 'flavor_profile', 'calories', 'protein', 'fat', 'carbohydrates']
    ].reset_index(drop=True)

    return result

# Example user input
user_input = {
    "calorie_target": 450,
    "diet": "vegetarian",
    "course": "main course",
    "flavor": "spicy"
}

# Get recommendations
recommendations = recommend_meals(
    user_preferences=user_input,
    dataframe=final_df,
    calorie_target=user_input["calorie_target"],
    diet_type=user_input["diet"],
    course=user_input["course"],
    flavor=user_input["flavor"]
)

print(recommendations)