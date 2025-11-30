import { CONFIG } from "./config.js";
import { displayErrorMessage } from "./errorMessage.js";
import { checkLogin } from "./biBi.js";
const formRegister = document.querySelector(".btn-primary");

checkLogin();

const apiUrl = CONFIG.apiUrl;

export async function getToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": CONFIG.apiKey,
      },
    };
    console.log(fetchOptions);
    const response = await fetch(url, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
    displayErrorMessage();
  }
}

export const profilesUrl = `${apiUrl}/auction/profiles`;

// getToken(profilesUrl);

// function loginClick() {
//   formRegister?.addEventListener("click", (event) => {
//     event.preventDefault();
//     console.log("Clicked");

//     async function loginUser(url, userData) {
//       try {
//         const postData = {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         };
//         const response = await fetch(url, postData);
//         console.log(response);
//         const json = await response.json();
//         console.log(json);
//         const accessToken = json.data.accessToken;
//         console.log(accessToken);
//         localStorage.setItem("accessToken", accessToken);
//         const loginData = json.data;
//         console.log(loginData);
//         localStorage.setItem("data", JSON.stringify(loginData));
//         goToLoggedListings(response);
//       } catch (error) {
//         console.log(error);
//         displayErrorMessage();
//       }
//     }

//     const loginEmail = document.querySelector("#email")?.value;
//     console.log(loginEmail);

//     const loginPassword = document.querySelector("#password")?.value;
//     console.log(loginPassword);

//     const loginInfo = {
//       email: loginEmail,
//       password: loginPassword,
//     };

//     // const userLogin = {
//     //   email: "line_test2@stud.noroff.no",
//     //   password: "linetestnoroff2",
//     // };

//     // anotherUser:
//     // name: nametest
//     // email: line_test3@stud.noroff.no
//     // password: linetestnoroff3

//     const loginUrl = `${apiUrl}/auth/login`;

//     loginUser(loginUrl, loginInfo);
//   });

//   function goToLoggedListings(response) {
//     if (response.status === 200) {
//       window.location.href = "my_page.html";
//     } else {
//       console.log("ikke bruker");
//     }
//   }
// }

// loginClick();

// function registerClick() {
//   formRegister?.addEventListener("click", (event) => {
//     event.preventDefault();
//     console.log("Clicked");

//     const loginName = document.querySelector("#name").value;
//     console.log(loginName);

//     const loginEmail = document.querySelector("#email").value;
//     console.log(loginEmail);

//     const loginPassword = document.querySelector("#password").value;
//     console.log(loginPassword);

//     const registerinInfo = {
//       name: loginName,
//       email: loginEmail,
//       password: loginPassword,
//     };
//     console.log(registerinInfo);

//     async function registerUser(url, userData) {
//       try {
//         const postData = {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         };
//         const response = await fetch(url, postData);
//         console.log(response);
//         const json = await response.json();
//         console.log(json);
//         goToLoggedListings(response);
//       } catch (error) {
//         console.log(error);
//         displayErrorMessage();
//       }
//     }

//     // const newUser = {
//     //   name: "line_test2",
//     //   email: "line_test2@stud.noroff.no",
//     //   password: "linetestnoroff2",
//     // };

//     const registerUrl = `${apiUrl}/auth/register`;

//     registerUser(registerUrl, registerinInfo);
//   });

//   function goToLoggedListings(response) {
//     if (response.status === 200) {
//       window.location.href = "my_page.html";
//     } else {
//       console.log("ikke bruker");
//     }
//   }
// }

// // registerClick();
