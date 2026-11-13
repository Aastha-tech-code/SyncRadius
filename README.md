# SyncRadius

A location-oriented community collaboration MVP built with FastAPI, SQLAlchemy, SQLite, React and Vite.

## Features
- User registration, login, JWT authentication and current-user profile
- Create, browse, search and join/leave communities
- Community owner-only update and delete
- Create, browse, search and delete own activities
- Activity owner-only update/delete API permissions
- Location text filtering for communities and activities
- Responsive landing page, dashboard, authentication, communities and activities UI

## Requirements
- Python 3.10+
- Node.js 20.19+ (recommended for the current Vite version)

## Run backend (terminal 1)
From the project root:

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

If PowerShell blocks activation, use Command Prompt and run `.venv\\Scripts\\activate.bat`, then install requirements.

Backend: http://127.0.0.1:8000  
API docs: http://127.0.0.1:8000/docs

## Run frontend (terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, normally http://localhost:5173.

## First use
1. Open the frontend.
2. Choose Get started and register a user.
3. Login happens automatically after registration.
4. Create a community, then join communities and create activities.

## Configuration
Copy `.env.example` to `.env` and set a private `SECRET_KEY` before deploying. For local development, the app uses SQLite at `syncradius.db`.

## Notes
This is a functional learning/MVP codebase, not a production deployment. Location discovery currently uses text-based location filtering; it does not yet use GPS coordinates, geospatial distance calculations, maps, email verification, password reset, or deployment infrastructure. `Base.metadata.create_all()` creates missing tables but does not migrate columns in an existing database. For a fresh install, use a new/empty database file. Back up any existing `syncradius.db` before replacing it.
