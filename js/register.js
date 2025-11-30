import { CONFIG } from "./config.js";
import { displayErrorMessage } from "./errorMessage.js";
import { checkLogin } from "./biBi.js";
const formRegister = document.querySelector(".btn-primary");
const apiUrl = CONFIG.apiUrl;

checkLogin();

export function registerClick() {
  formRegister?.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Clicked");

    const loginName = document.querySelector("#name").value;
    console.log(loginName);

    const loginEmail = document.querySelector("#email").value;
    console.log(loginEmail);

    const loginPassword = document.querySelector("#password").value;
    console.log(loginPassword);

    const registerinInfo = {
      name: loginName,
      email: loginEmail,
      password: loginPassword,
    };
    console.log(registerinInfo);

    async function registerUser(url, userData) {
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
        goToLoggedListings(response);
      } catch (error) {
        console.log(error);
        displayErrorMessage();
      }
    }

    const registerUrl = `${apiUrl}/auth/register`;

    registerUser(registerUrl, registerinInfo);
  });

  function goToLoggedListings(response) {
    if (response.status === 200) {
      window.location.href = "my_page.html";
    } else {
      console.log("ikke bruker eller allerede eksisterende bruker");
    }
  }
}

registerClick();

// en annen bruker:
// name:lisabeth
// email:lisabeth@stud.noroff.no
// password: noroff
