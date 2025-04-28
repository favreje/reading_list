"""
A RESTful API
Defines API endpoints. This is where we connect the routes (URLs) to the CRUD operations
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from .. import crud, models, schemas
from ..database import get_db


router = APIRouter()


@router.get("/", response_model=List[schemas.Book])
def read_books(
    status: Optional[str] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    """
    Retrieve books with optional filtering by status
    """
    books = crud.get_books(db, skip=skip, limit=limit, status=status)
    return books


@router.post("/", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db)):
    """
    Create a new book
    """
    return crud.create_book(db=db, book=book)


@router.get("/{book_id}", response_model=schemas.Book)
def read_book(book_id: int, db: Session = Depends(get_db)):
    """
    Get a specific book by id
    """
    db_book = crud.get_book(db, book_id=book_id)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book


@router.put("/{book_id}", response_model=schemas.Book)
def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(get_db)):
    """
    Update a book
    """
    db_book = crud.update_book(db, book_id=book_id, book=book)
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book


@router.delete("/{book_id}", response_model=bool)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    """
    Delete a book
    """
    success = crud.delete_book(db, book_id=book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return True
