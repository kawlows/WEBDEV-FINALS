const API_BASE = "http://127.0.0.1:8000";

const booksListEl = document.getElementById("books-list");
const formEl = document.getElementById("book-form");
const titleEl = document.getElementById("title");
const authorEl = document.getElementById("author");

function renderBooks(books) {
  booksListEl.innerHTML = "";

  if (!books || books.length === 0) {
    booksListEl.innerHTML = "<p>No books yet. Add one above!</p>";
    return;
  }

  books.forEach((book) => {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div class="book-author">by ${book.author}</div>
      <div class="book-actions">
        <button data-id="${book.id}" class="delete-btn">Delete</button>
      </div>
    `;
    booksListEl.appendChild(div);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("data-id");
      try {
        await axios.delete(`${API_BASE}/books/${id}`);
        loadBooks();
      } catch (err) {
        console.error(err);
        alert("Failed to delete book");
      }
    });
  });
}

async function loadBooks() {
  try {
    const res = await axios.get(`${API_BASE}/books`);
    renderBooks(res.data);
  } catch (err) {
    console.error(err);
    booksListEl.innerHTML = "<p>Error loading books. Check console.</p>";
  }
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = titleEl.value.trim();
  const author = authorEl.value.trim();

  if (!title || !author) return;

  try {
    await axios.post(`${API_BASE}/books`, { title, author });
    titleEl.value = "";
    authorEl.value = "";
    loadBooks();
  } catch (err) {
    console.error(err);
    alert("Failed to add book");
  }
});

loadBooks();