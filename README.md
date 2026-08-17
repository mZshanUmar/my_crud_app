# FastAPI CRUD Application

A simple CRUD application with FastAPI backend and vanilla JavaScript frontend, using PostgreSQL database.

## Project Structure

```
.
├── backend/
│   ├── main.py          # FastAPI application and endpoints
│   ├── models.py        # SQLAlchemy database models
│   ├── schemas.py       # Pydantic schemas for validation
│   ├── database.py      # Database connection and session
│   ├── requirements.txt # Python dependencies
│   └── .env            # Environment variables
└── frontend/
    ├── index.html      # Main HTML page
    ├── style.css       # Styling
    └── app.js          # JavaScript for API calls
```

## Prerequisites

- Python 3.8+
- PostgreSQL database running locally
- pip (Python package manager)

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE cruddb;
```

### 2. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Update the `.env` file with your PostgreSQL credentials:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/cruddb
```

### 3. Run the Backend

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

- API Documentation: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### 4. Run the Frontend

Open `frontend/index.html` in your web browser, or use a simple HTTP server:

```bash
cd frontend
python -m http.server 3000
```

Then visit `http://localhost:3000`

## API Endpoints

- `GET /` - Root endpoint
- `POST /items/` - Create a new item
- `GET /items/` - Get all items
- `GET /items/{item_id}` - Get a specific item
- `PUT /items/{item_id}` - Update an item
- `DELETE /items/{item_id}` - Delete an item

## Features

- ✅ Create items with title and description
- ✅ View all items in a clean interface
- ✅ Delete items
- ✅ Full CRUD operations available via API
- ✅ Responsive design
- ✅ Error handling and user feedback

## Technologies Used

**Backend:**
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
