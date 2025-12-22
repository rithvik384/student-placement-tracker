document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "test@example.com" && password === "1234") {
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("message").innerText = "Invalid credentials";
  }
});

function logout() {
  window.location.href = "index.html";
}
