// auth.js

// Login function
function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simple fixed credentials (you can change them)
  const validUser = "admin";
  const validPass = "1234";

  if (username === validUser && password === validPass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html"; // ✅ redirect to home page
  } else {
    document.getElementById("error").textContent = "❌ Invalid username or password!";
  }
}

// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html"; // ✅ redirect to login page
}

// Optional: Protect home page directly from being opened without login
window.addEventListener("DOMContentLoaded", function() {
  if (document.body.classList.contains("home")) {
    if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "login.html";
    } else {
      document.body.style.display = "block"; // show home page after auth check
    }
  } else if (document.body.classList.contains("login")) {
    // show login page
    document.body.style.display = "block";
  }
});
