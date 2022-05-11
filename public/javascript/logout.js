document.getElementById("logout").addEventListener("click", logout);

function logout(event) {
  event.preventDefault();

  axios
    .post("/api/auth/logout")
    .then((result) => {
      window.location = "/";
    })
    .catch((error) => {
      alert(`${error.response.data}`);
    });
}
