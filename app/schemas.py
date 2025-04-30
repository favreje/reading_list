"""
Create schemas for type checking interactions with database
"""

from typing import Optional
from pydantic import BaseModel


# Shared properties
class BookBase(BaseModel):
    author: str
    title: str
    published: Optional[str] = None
    pages: Optional[int] = None
    category: str
    genre: str
    short_list: bool = False
    status: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    notes: Optional[str] = ""


# Properties for creating a book
class BookCreate(BookBase):
    pass


# Properties for updating a book
# -- We repeat the properties here to allow for modifying only a subset of values
# -- Therefore, each field should be optional
class BookUpdate(BaseModel):
    author: Optional[str] = None
    title: Optional[str] = None
    published: Optional[str] = None
    pages: Optional[int] = None
    category: Optional[str] = None
    genre: Optional[str] = None
    short_list: Optional[bool] = None
    status: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    notes: Optional[str] = ""


# Properties shared by models in the database
class BookInDBBase(BookBase):
    id: int

    class Config:
        orm_mode = True


# Properties to return to client
class Book(BookInDBBase):
    pass
