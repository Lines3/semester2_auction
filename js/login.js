import { CONFIG } from "./config.js";
import { displayErrorMessage } from "./errorMessage.js";
import { checkLogin } from "./biBi.js";
import { validationLogin } from "./formValidation.js";

const formRegister = document.querySelector(".btn-primary");

const apiUrl = CONFIG.apiUrl;

checkLogin();

function loginClick() {
  formRegister?.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Clicked");

    validationLogin();

    async function loginUser(url, userData) {
      try {
        const postData = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        const accessToken = json.data.accessToken;
        console.log(accessToken);
        localStorage.setItem("accessToken", accessToken);
        const loginData = json.data;
        console.log(loginData);
        localStorage.setItem("data", JSON.stringify(loginData));
        goToLoggedListings(response);
      } catch (error) {
        console.log(error);
        displayErrorMessage();
      }
    }

    const loginEmail = document.querySelector("#email")?.value;
    console.log(loginEmail);

    const loginPassword = document.querySelector("#password")?.value;
    console.log(loginPassword);

    const loginInfo = {
      email: loginEmail,
      password: loginPassword,
    };

    // const userLogin = {
    //   email: "line_test2@stud.noroff.no",
    //   password: "linetestnoroff2",
    // };

    // anotherUser:
    // name: nametest
    // email: line_test3@stud.noroff.no
    // password: linetestnoroff3

    const loginUrl = `${apiUrl}/auth/login`;

    loginUser(loginUrl, loginInfo);
  });

  function goToLoggedListings(response) {
    if (response.status === 200) {
      window.location.href = "my_page.html";
    } else {
      console.log("ikke bruker");
    }
  }
}

loginClick();
