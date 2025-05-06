// Basic API interaction functions

// Base  URL for the API
const API_URL = 'http://localhost:8000/api';

// Function to fetch all books with optional filters
export async function getBooks(statusFilter = '', searchQuery = '') {
  let url = `${API_URL}/books`;

  // Add filter if provided
  const params = new URLSearchParams();
  if (statusFilter) params.append('status', statusFilter);

  // Note: search is not implemented in the backend yet, but we'll prepare for it
  const queryString = params.toString();
  if (queryString) url += `?${queryString}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw error;
  }
}

// Function to fetch a single book by ID
export async function getBook(id) {
  try {
    const response = await fetch(`${API_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch book ${id}:`, error);
    throw error;
  }
}

// Function to create a new book
export async function createBook(bookData) {
  try {
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Contennt-Type': 'application/json'
      },
      body: JSON.stringify(bookData)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create book:', error);
    throw error;
  }
}

// Function to update an existing book
export async function updateBook(id, bookData) {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Contennt-Type': 'application/json'
      },
      body: JSON.stringify(bookData)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to update book ${id}:`, error);
    throw error;
  }
}

// Function to delete a book
export async function deleteBook(id) {
  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to delete book ${id}:`, error);
    throw error;
  }
}
