// Add and Edit Form Handling

import { createBook, updateBook, getBook } from "./api.js";
import { renderBookList } from "./bookList.js"


// DOM elements
const formContainer = document.getElementById('book-form-container');
const form = document.getElementById('book-form');
const formTitle = document.getElementById('form-title');
const addBookBtn = document.getElementById('add-book-btn');
const cancelBtn = document.getElementById('cancel-btn');
const closeBtn = document.querySelector('.close-btn');
const bookIdInput = document.getElementById('book-id');

// Function to open the form for creating a new book
export function openAddForm() {
  form.reset();
  bookIdInput.value = '';
  formTitle.textContent = 'Add New Book';

  // Show the container
  formContainer.classList.remove('hidden');
}

// Function to open the form for editing a book
export async function openEditForm(id) {
  try {
    // Fetch book data
    const book = await getBook(id);

    // Populate the form
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('category').value = book.category;
    document.getElementById('genre').value = book.genre;
    document.getElementById('status').value = book.status;
    document.getElementById('pages').value = book.pages || '';
    document.getElementById('published').value = book.published || '';
    document.getElementById('short_list').value = book.short_list;
    document.getElementById('notes').value = book.notes || '';
    document.getElementById('start_date').value = book.start_date || '';
    document.getElementById('end_date').value = book.end_date || '';

    bookIdInput.value = book.id;
    formTitle.textContent = 'Edit Book';

    // Show the container
    formContainer.classList.remove('hidden');
  } catch (error) {
    console.error('Failed to load book for editing:', error);
    alert('Failed to load the book. Please try again.');
  }
}

// Function to close the form
function closeForm() {
  formContainer.classList.add('hidden');
  form.reset();
}

// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const bookData = {
    title: formData.get('title'),
    author: formData.get('author'),
    category: formData.get('category'),
    genre: formData.get('genre'),
    status: formData.get('status'),
    pages: formData.get('pages') ? parseInt(formData.get('pages')) : null,
    published: formData.get('published') || null,
    short_list: formData.get('short_list') === 'on',
    notes: formData.get('notes') || null,
    start_date: formData.get('start_date') || null,
    end_date: formData.get('end_date') || null,
  };

  try {
    // Check if we're adding or editing
    const bookId = bookIdInput.value;
    if (bookId) {
      await updateBook(bookId, bookData);
    } else {
      await createBook(bookData);
    }
    closeForm();

    // Refresh the book list
    await renderBookList();
  } catch (error) {
    console.error('Failed to save book:', error);
    alert('Failed to save the book. Please try again.');
  }
}

// Set up event listeners
export function setupFormHandlers() {
  addBookBtn.addEventListener('click', openAddForm);
  cancelBtn.addEventListener('click', closeForm);
  closeBtn.addEventListener('click', closeForm);
  form.addEventListener('submit', submitForm);

  // Close the modal if clicking outside the content
  formContainer.addEventListener('click', (event) => {
    if (event.target === formContainer) {
      closeForm();
    }
  });
}

