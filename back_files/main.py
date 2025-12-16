from typing import List

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from database import engine, create_db_and_tables
from models import Book, BookCreate

app = FastAPI()

# CORS: allow any origin for simple demo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # dev/demo: allow all
    allow_credentials=False,  # must be False when using "*"
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_session():
    with Session(engine) as session:
        yield session


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def read_root():
    return {"message": "Book Tracker API is running"}


@app.get("/books", response_model=List[Book])
def read_books(session: Session = Depends(get_session)):
    books = session.exec(select(Book)).all()
    return books


@app.post("/books", response_model=Book)
def create_book(book: BookCreate, session: Session = Depends(get_session)):
    db_book = Book.from_orm(book)
    session.add(db_book)
    session.commit()
    session.refresh(db_book)
    return db_book


@app.delete("/books/{book_id}")
def delete_book(book_id: int, session: Session = Depends(get_session)):
    book = session.get(Book, book_id)
    if not book:
        return {"detail": "Book not found"}
    session.delete(book)
    session.commit()
    return {"detail": "Book deleted"}