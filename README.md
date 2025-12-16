# Book Tracker – FastAPI + Vanilla JS

This is a simple Book Tracker web app.  
The backend uses FastAPI + SQLModel, and the frontend is plain HTML/CSS/JavaScript with Axios for HTTP requests.

You can add books (title + author), list them, and delete them. Data is stored in a local SQLite file.

---

## Requirements

- Python 3.x installed  
- Internet connection (for the Axios CDN) [web:96]

No virtual environment is required.

---

## How to Run the Backend

1. Open a terminal in the project folder.
2. Go to the backend directory:

cd back_files

3. Install dependencies:

pip install -r requirements.txt

4. Start the FastAPI server with Uvicorn:

uvicorn main:app --reload

5. Test the API in a browser:
- `http://127.0.0.1:8000/` → basic JSON message  
- `http://127.0.0.1:8000/books` → list of books (empty at first)

Leave this terminal running.

---

## How to Run the Frontend

1. Open a **second** terminal in the project folder.
2. Go to the frontend directory:

cd front_files

3. Start a simple HTTP server:

python -m http.server 5500

4. Open this URL in a browser:

http://127.0.0.1:5500/index.html

You should now see the Book Tracker page.

---

## How to Use the App

1. Make sure the backend (`uvicorn main:app --reload`) is running.
2. Open `http://127.0.0.1:5500/index.html`.
3. In the form:
- Enter a **Title**.
- Enter an **Author**.
- Click **“Add Book”**.
4. The book appears in the list below.
5. Click **“Delete”** to remove a book from the database.

The frontend talks to the backend via Axios requests to `http://127.0.0.1:8000/books` (GET, POST, DELETE).

---

## Notes

- CORS is already configured in `main.py` with `allow_origins=["*"]`, so no extra setup is needed for the browser to call the API.
- The SQLite database file (`books.db`) is created automatically when the server starts.
- Karlos Gwapo
