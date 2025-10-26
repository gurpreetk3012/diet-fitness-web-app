# Setup Notes

## Technology Stack
- **Backend:** Flask 3.0+ (Python 3.10+)
- **Frontend:** React 18 + Vite 5 + Tailwind CSS 3
- **Database:** SQLite (development), PostgreSQL (production)

## Backend Setup
1. Navigate to `backend/` folder
2. Create virtual environment: `python -m venv venv`
3. Activate: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. Install dependencies: `pip install -r requirements.txt`
5. Run server: `python app.py`
6. Backend runs on: `http://127.0.0.1:5000/`

## Frontend Setup
1. Navigate to `frontend/` folder
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Frontend runs on: `http://localhost:5173/`

## Issues Resolved
- Initial CORS configuration added for Flask-React communication
- Virtual environment created to isolate dependencies