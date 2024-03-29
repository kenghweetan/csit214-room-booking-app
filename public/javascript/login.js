document.getElementById("loginForm").addEventListener("submit", login);

function login(event) {
  event.preventDefault();
  const userType = document.getElementById("userType").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios
    .post("/api/auth/login", {
      userType: userType === "User Admin" ? "userAdmin" : userType,
      email,
      password,
    })
    .then((result) => {
      window.location = "/";
    })
    .catch((error) => {
      console.log(error.response.data);
      alert(`${error.response.data}`);
    });
}
