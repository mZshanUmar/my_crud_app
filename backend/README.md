# Backend - FastAPI CRUD API

FastAPI backend server with PostgreSQL database for CRUD operations.

## Prerequisites

- Python 3.8 or higher
- PostgreSQL installed and running
- pip (Python package manager)

## Installation Steps

### 1. Create PostgreSQL Database

Open PostgreSQL command line or pgAdmin and create a database:

```sql
CREATE DATABASE cruddb;
```

### 2. Install Python Dependencies

Navigate to the backend folder and install required packages:

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure Database Connection

Edit the `.env` file with your PostgreSQL credentials:

```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/cruddb
```

Replace:
- `postgres` with your PostgreSQL username (default is usually `postgres`)
- `yourpassword` with your PostgreSQL password
- `localhost:5432` with your host and port if different
- `cruddb` with your database name if you used a different name

## Running the Server

Start the FastAPI development server:

```bash
uvicorn main:app --reload
```

The server will start at: **http://localhost:8000**

### Verify Server is Running

Open your browser and visit:
- **API Root:** http://localhost:8000
- **Interactive API Docs (Swagger):** http://localhost:8000/docs
- **Alternative API Docs (ReDoc):** http://localhost:8000/redoc

You should see the API documentation where you can test all endpoints.

## Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint - health check |
| POST | `/items/` | Create a new item |
| GET | `/items/` | Get all items (with optional pagination) |
| GET | `/items/{item_id}` | Get a specific item by ID |
| PUT | `/items/{item_id}` | Update an item |
| DELETE | `/items/{item_id}` | Delete an item |

## Testing the API

### Using the Interactive Docs (Recommended)

1. Go to http://localhost:8000/docs
2. Click on any endpoint
3. Click "Try it out"
4. Fill in the parameters
5. Click "Execute"

### Using curl (Command Line)

Create an item:
```bash
curl -X POST "http://localhost:8000/items/" -H "Content-Type: application/json" -d "{\"title\":\"Test Item\",\"description\":\"This is a test\"}"
```

Get all items:
```bash
curl http://localhost:8000/items/
```

### Using the Frontend

Make sure the frontend is also running (see frontend README), then use the web interface.

## Database Tables

The application will automatically create the following table on first run:

**items**
- `id` (Integer, Primary Key)
- `title` (String, 255 chars)
- `description` (Text, nullable)
- `created_at` (DateTime with timezone)

## Troubleshooting

### Database Connection Error

If you see errors like `could not connect to server`:
- Make sure PostgreSQL is running
- Verify your credentials in `.env` file
- Check if the database `cruddb` exists

### Port Already in Use

If port 8000 is already in use, run on a different port:
```bash
uvicorn main:app --reload --port 8001
```

### Module Not Found Errors

Make sure all dependencies are installed:
```bash
pip install -r requirements.txt
```

## Development Notes

- The server runs in reload mode (`--reload`), so changes to Python files will automatically restart the server
- CORS is enabled for all origins to allow frontend access
- Database tables are created automatically on startup
- SQLAlchemy ORM is used for database operations

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the server.
