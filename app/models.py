"""
Creates a basic model (or a "mapping" class) of our database schema using
SQLAlchemy's ORM (Object Relational Mapping)
"""

from sqlalchemy import Boolean, Column, Integer, String, Text
from .database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    author = Column(String, nullable=False, index=True)
    title = Column(String, nullable=False)
    published = Column(String, nullable=True)
    pages = Column(Integer, nullable=True)
    category = Column(String, nullable=False)
    genre = Column(String, nullable=False)
    short_list = Column(Boolean, default=False)
    status = Column(String, nullable=False, index=True)
    start_date = Column(String, nullable=True)
    end_date = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
