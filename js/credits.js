import { CONFIG } from "./config.js";
import { displayErrorMessage } from "./errorMessage.js";
const apiUrl = CONFIG.apiUrl;
export const profilesUrl = `${apiUrl}/auction/profiles`;
// console.log(profilesUrl);
const avatarButton = document.querySelector(".update-avatar-btn");

export function getParam(param) {
  const queryString = window.location.search;
  //   console.log(queryString);
  const params = new URLSearchParams(queryString);
  //   console.log(params);
  const value = params.get(param);
  //   console.log(value);
  return params.get(param);
}

export async function displayCredits() {
  try {
    const name = getParam("name");
    // console.log(name);

    const token = localStorage.getItem("accessToken");
    // console.log(token);
    const getName = JSON.parse(localStorage.getItem("data"));
    // console.log(getName.name);
    const creditUrlName = `${profilesUrl}/${getName.name}`;
    // console.log(creditUrl);
    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": CONFIG.apiKey,
      },
    };
    // console.log(fetchOptions);
    const response = await fetch(creditUrlName, fetchOptions);
    // console.log(response);
    const json = await response.json();
    // console.log(json);
    const data = json.data;
    // console.log(data);

    const creditContainer = document.querySelector(".credit-container");
    const creditCard = document.createElement("div");
    creditCard.classList.add("display-credit");
    creditCard.textContent = data.credits;

    creditContainer?.appendChild(creditCard);
  } catch (error) {
    // console.log(error);
    displayErrorMessage();
  }
}

displayCredits();
