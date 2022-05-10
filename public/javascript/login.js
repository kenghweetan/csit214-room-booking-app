document.getElementById("loginForm").addEventListener("submit", login);

function login(event) {
  event.preventDefault();
  const userType = document.getElementById("userType").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios
    .post("/api/login", {
      userType,
      email,
      password,
    })
    .then((result) => {
      window.location = "/";
    })
    .catch((error) => {
      alert(`${error.response.data}`);
    });
}
