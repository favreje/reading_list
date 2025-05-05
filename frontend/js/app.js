// Main Application Logic

import { renderBookList, setupDeleteHandler, setupFilters } from "./bookList.js";
import { setupFormHandlers, openEditForm } from "./bookForm.js";

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupFormHandlers();
  setupFilters();
  setupDeleteHandler(openEditForm);

  // Load the initial book list
  renderBookList();
});
