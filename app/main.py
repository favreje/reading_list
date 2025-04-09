from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import books
from .database import engine
from . import models


# Create tables in the database

# Note that SQLAlchemy takes care of checking whether a table already exists. Specifically, it:
#   1. Inspects the database to see what tables are present
#   2. Compares that with the tables defined in your models
#   3. Creates only the tables that are missing
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Book List API",
    description="A simple API for managing your reading list",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(books.router, prefix="/api/books", tags=["books"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Book List API"}
