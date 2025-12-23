fetch("http://localhost:3000/api/student/profile", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => {
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    return;
  }
  return res.json();
})
.then(data => {
  if (!data) return;

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
  .then(() => alert("Profile updated"));
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}