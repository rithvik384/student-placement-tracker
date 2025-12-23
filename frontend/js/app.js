const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "index.html";
}

document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("message").innerText = data.message;
      return;
    }

    localStorage.setItem("token", data.token);

    window.location.href = "dashboard.html";

  } catch (err) {
    document.getElementById("message").innerText = "Server error";
  }
});

fetch("http://localhost:3000/api/student/profile", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => {
  document.getElementById("profile").innerHTML = `
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Branch:</b> ${data.branch}</p>
    <p><b>Status:</b> ${data.status}</p>
    <p><b>Company:</b> ${data.company || "-"}</p>
    <p><b>Package:</b> ${data.package_lpa || "-"}</p>
  `;
});

function updateProfile() {
  fetch("http://localhost:3000/api/student/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      company: document.getElementById("company").value,
      package_lpa: document.getElementById("package").value,
      status: document.getElementById("status").value
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    alert(data.message || "Profile updated");
    location.reload();
  })
  .catch(err => {
    console.error(err);
    alert("Update failed");
  });
}


function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}