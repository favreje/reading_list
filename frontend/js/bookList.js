// Book List Display Logic
import { getBooks, deleteBook } from "./api.js";

// DOM elements
const booksContainer = document.getElementById('books-container');
const loadingIndicator = document.getElementById('loading');
const noBooks = document.getElementById('no-books');
const statusFilter = document.getElementById('status-filter');
const searchInput = document.getElementById('search');

// Function to render the book list
export async function renderBookList() {
  try {
    showLoading(true);

    // Get filter values
    const status = statusFilter.value;
    const searchQuery = searchInput.value.trim();

    // Fetch books with filters
    const books = await getBooks(status, searchQuery);

    // Clear the container
    booksContainer.innerHTML = '';

    // Check if we have books
    if (books.length === 0) {
      noBooks.classList.remove('hidden');
      return;
    }

    // Hide the "no books" message
    noBooks.classList.add('hidden');

    // Render each book
    books.forEach(book => {
      const row = document.createElement('tr');
      row.dataset.id = book.id;

      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td><span class="status-badge ${book.status}">${formatStatus(book.status)}</span></td>
        <td class="actions">
          <button class="btn edit-btn" data-id="${book.id}">Edit</button>
          <button class="btn danger delete-btn" data-id="${book.id}">Delete</button>
        </td>
      `;

      booksContainer.appendChild(row);

    });

  } catch (error) {
    console.error('Error rendering book list:', error);
    booksContainer.innerHTML = `<tr><td colspan="5">Error loading books. Please try again.</td></tr>`;
  } finally {
    showLoading(false);
  }
}

// Event handler for the delete button
export function setupDeleteHandler(openEditForm) {
  booksContainer.addEventListener('click', async (event) => {
    // Check if we clicked a delete button
    if (event.target.classList.contains('delete-btn')) {
      const id = event.target.dataset.id;

      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await deleteBook(id);
          await renderBookList();
        } catch (error) {
          console.error('Failed to delete', error);
          alert('Failed to delete the book. Please try again.');
        }
      }
    }

    // Check if we clicked on edit button
    if (event.target.classList.contains('edit-btn')) {
      const id = event.target.dataset.id;
      openEditForm(id);
    }
  });
}

// Helper function to format status values
function formatStatus(status) {
  switch (status) {
    case 'not_read':
      return 'Not Read';
    case 'reading':
      return 'Currently Reading';
    case 'read':
      return 'Read';
    case 'paused':
      return 'Paused';
    default:
      return status;
  }
}

// Helper function to show or hide loading indicator
function showLoading(show) {
  if (show) {
    loadingIndicator.classList.remove('hidden');
  } else {
    loadingIndicator.classList.add('hidden');
  }
}

// Set up event listeners for filters
export function setupFilters() {
  statusFilter.addEventListener('change', renderBookList);

  // Debounce search input to avoid too many requests
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(renderBookList, 300);
  });
}
