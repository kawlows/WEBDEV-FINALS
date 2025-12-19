// Simple authentication system using localStorage
const API_BASE = 'http://127.0.0.1:8000';

// Check if user is already logged in
window.addEventListener('load', () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Redirect to main page if already logged in
    window.location.href = 'index.html';
  }
});

const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('login-error');
const loading = document.getElementById('loading');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  errorMsg.style.display = 'none';
  errorMsg.textContent = '';

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic validation
  if (!username || !password) {
    errorMsg.textContent = 'Please enter both username and password';
    errorMsg.style.display = 'block';
    return;
  }

  loading.style.display = 'block';

  try {
    // Send login request to backend
    const response = await axios.post(`${API_BASE}/login`, {
      username: username,
      password: password,
    });

    // Store token in localStorage
    if (response.data.access_token) {
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('username', username);
      
      // Redirect to main app
      window.location.href = 'index.html';
    } else {
      errorMsg.textContent = 'Login failed. Please try again.';
      errorMsg.style.display = 'block';
    }
  } catch (error) {
    loading.style.display = 'none';
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      errorMsg.textContent = 'Invalid username or password';
    } else if (error.response?.status === 400) {
      errorMsg.textContent = 'Invalid request. Please check your input.';
    } else if (error.message === 'Network Error') {
      errorMsg.textContent = 'Cannot connect to server. Make sure backend is running on http://127.0.0.1:8000';
    } else {
      errorMsg.textContent = 'Login failed. Please try again.';
    }
    errorMsg.style.display = 'block';
  }
});

// Clear error message on input
usernameInput.addEventListener('input', () => {
  errorMsg.style.display = 'none';
});
passwordInput.addEventListener('input', () => {
  errorMsg.style.display = 'none';
});
