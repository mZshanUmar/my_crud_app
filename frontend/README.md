# Frontend - CRUD Application UI

Simple vanilla JavaScript frontend for interacting with the FastAPI CRUD API.

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- Backend server running at http://localhost:8000

## Installation

No installation required! This is a static HTML/CSS/JavaScript application.

## Running the Frontend

You have **three options** to run the frontend:

### Option 1: Open Directly in Browser (Simplest)

1. Navigate to the `frontend` folder
2. Double-click `index.html` or right-click and select "Open with" → your browser

**Note:** Some browsers may block API calls when opening files directly due to CORS policies. If this happens, use Option 2 or 3.

### Option 2: Using Python HTTP Server (Recommended)

If you have Python installed:

```bash
cd frontend
python -m http.server 3000
```

Then open your browser and visit: **http://localhost:3000**

### Option 3: Using Node.js HTTP Server

If you have Node.js installed:

```bash
cd frontend
npx http-server -p 3000
```

Then open your browser and visit: **http://localhost:3000**

### Option 4: Using VS Code Live Server

If you're using Visual Studio Code:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Before Using the Frontend

**IMPORTANT:** Make sure the backend server is running!

```bash
cd backend
uvicorn main:app --reload
```

The frontend expects the API to be available at http://localhost:8000

## Using the Application

### Creating Items

1. Fill in the **Title** field (required)
2. Optionally add a **Description**
3. Click the **"Create Item"** button
4. You'll see a success message and the item will appear in the list below

### Viewing Items

- All items are displayed in the "All Items" section
- Click the **"Refresh List"** button to reload items from the database
- Each item shows:
  - Title
  - Description
  - ID and creation timestamp

### Deleting Items

- Click the **"Delete"** button on any item
- Confirm the deletion in the popup dialog
- The item will be removed from the database and the list will refresh

## Features

- ✅ Responsive design that works on desktop and mobile
- ✅ Real-time feedback with success/error messages
- ✅ Clean, modern UI with gradient background
- ✅ Smooth animations and hover effects
- ✅ XSS protection with HTML escaping
- ✅ Confirmation dialog before deletion

## Configuration

If your backend is running on a different port or host, edit `app.js`:

```javascript
const API_URL = 'http://localhost:8000';  // Change this if needed
```

## File Structure

```
frontend/
├── index.html    # Main HTML structure
├── style.css     # All styling and design
├── app.js        # JavaScript for API interactions
└── README.md     # This file
```

## Troubleshooting

### "Error connecting to server" message

**Cause:** Backend is not running or wrong URL

**Solution:**
- Make sure backend is running on http://localhost:8000
- Check backend terminal for errors
- Verify `API_URL` in `app.js` matches your backend URL

### Items not loading

**Cause:** CORS issues or API connection problem

**Solution:**
- Don't open `index.html` directly; use a local server (Option 2 or 3 above)
- Check browser console (F12) for errors
- Verify backend CORS middleware is enabled (should be by default)

### No items showing up after creation

**Cause:** Database might not be configured correctly

**Solution:**
- Check backend terminal for database errors
- Verify PostgreSQL is running
- Check backend `.env` file has correct database credentials

### Styles not loading properly

**Cause:** CSS file path issue or browser cache

**Solution:**
- Make sure `style.css` is in the same folder as `index.html`
- Try hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- Clear browser cache

## Browser Compatibility

Tested and working on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## Development Notes

- Uses vanilla JavaScript (no frameworks required)
- Fetch API for HTTP requests
- ES6+ syntax
- No build process needed
- All styles are custom CSS (no frameworks)

## API Endpoints Used

The frontend interacts with these backend endpoints:

- `POST /items/` - Create new item
- `GET /items/` - Fetch all items
- `DELETE /items/{id}` - Delete an item

## Stopping the Server

If you're using a local server (Python or Node.js):
- Press `Ctrl + C` in the terminal to stop the server

If you opened the file directly in the browser:
- Simply close the browser tab

## Next Steps

Want to extend the functionality? Consider adding:
- Edit/Update functionality for items
- Search and filter features
- Pagination for large lists
- Form validation with visual feedback
- Dark mode toggle
