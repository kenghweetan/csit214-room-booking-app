console.log("hi");
document.getElementById("loginForm").addEventListener("submit", login);

function login(event) {
  event.preventDefault();
  const userType = document.getElementById("userType").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios({
    method: "post",
    url: "/login",
    data: { userType, email, password },
  })
    .then((result) => {
      window.location = "/calendar-view";
    })
    .catch((error) => {
      console.log(`${error.response.data}`);
    });
}
