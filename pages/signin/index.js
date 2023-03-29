const body = document.querySelector("body");

const url = "http://localhost:8000";

const signContainer = document.querySelector(".S-container");

window.addEventListener("load", () => {
  body.classList.add("visible");
});

const signInContainer = document.querySelector(".signIn-container");

signInContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  const signInEmail = document.querySelector(".signin-email");
  const signInPassword = document.querySelector(".signin-password");

  const email = signInEmail.value;
  const password = signInPassword.value;

  fetch(`${url}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
  console
    .log(res)
    .then((data) => {
      const { token } = data;

      if (token) {
        localStorage.setItem("jwt", token);
        location.href = "/pages/dashboard/dashboard.html";
      } else {
        alert("signin again");
      }
    })
    .catch((err) => {
      alert("Error in signing in..Retry!!!");
      console.log(err);
    });
});

const signUpContainer = document.querySelector(".signUp-container");

signUpContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector(".signup-email").value;
  const name = document.querySelector(".signup-name").value;
  const password = document.querySelector(".signup-password").value;
  const retypedPassword = document.querySelector(
    ".signup-retyped-password"
  ).value;

  if (password != retypedPassword) {
    alert("Passwords dont match");
    return;
  }

  fetch(`${url}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;
      console.log("hi piggy");

      if (token) {
        localStorage.setItem("jwt", token);
        location.href = "/pages/dashboard/dashboard.html";
      } else {
        alert("signup again");
      }
    })
    .catch((err) => {
      alert("Error in signing up!!!");
      console.log(err);
    });
});
