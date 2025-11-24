// import { CONFIG } from "./config.js";
const formRegister = document.querySelector(".btn-primary");
console.log(formRegister);
const loginErrorMessage = document.querySelector(".loginErrorMessage");

/**
 * API call registering a user
 * @param {string} url
 * @param {{name: string}} userData
 * ```js
 * registerUser(registerUrl, newUser);
 * ```
 */

// const apiUrl = CONFIG.apiUrl;
const apiUrl = "https://v2.api.noroff.dev";

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
  } catch (error) {
    console.log(error);
  }
}

const newUser = {
  name: "line_test2",
  email: "line_test2@stud.noroff.no",
  password: "linetestnoroff2",
};

const registerUrl = `${apiUrl}/auth/register`;

// registerUser(registerUrl, newUser);

async function getWithToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const netlifyKey = process.env.API_KEY;
    console.log(token);
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": netlifyKey,
      },
    };
    console.log(fetchOptions);
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

const profilesUrl = `${apiUrl}/auction/profiles`;

getWithToken(profilesUrl);

function registerClick() {
  formRegister.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Clicked");

    const loginName = document.querySelector(".name").value;
    // console.log(loginName);

    const loginEmail = document.querySelector(".email").value;
    // console.log(loginEmail);

    const loginPassword = document.querySelector(".password").value;
    // console.log(loginPassword);

    const loginInfo = {
      name: loginName,
      email: loginEmail,
      password: loginPassword,
    };
    // console.log(loginInfo);

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
        localStorage.setItem("accessToken", accessToken);
        goToLoggedListings(response);
      } catch (error) {
        console.log(error);
        loginErrorMessage.innerHTML = "Login error - uups";
      }
    }

    // const userLogin = {
    //   email: "line_test2@stud.noroff.no",
    //   password: "linetestnoroff2",
    // };

    const loginUrl = `${apiUrl}/auth/login`;

    loginUser(loginUrl, loginInfo);
  });

  function goToLoggedListings(response) {
    if (response.status === 200) {
      window.location.href = "listingsLogin.html";
    } else {
      console.log("ikke bruker");
    }
  }
}

registerClick();
