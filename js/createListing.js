import { CONFIG } from "./config.js";
import { displayErrorMessage } from "./errorMessage.js";
import { profilesUrl } from "./credits.js";
console.log(profilesUrl);
const createListingContainer = document.querySelector(".create-listing");
const createListingButton = document.querySelector("#create-listing-btn");
console.log(createListingButton);

const apiUrl = CONFIG.apiUrl;
const createListingUrl = `${apiUrl}/auction/listings`;
console.log(profilesUrl);

// -  GET: /auction/profiles/<name>/listings (get listings by profile)

//finne data fra localstorage
//plassere data fra local storage inkludert title, deadline date, media gallery and description
//lag et skjema som man kan fylle ut
//hent info fra skjema sånn som med innloggingskjemaet
//PUT metode til API? finn i dokumentasjon
//bildelink: https://cdn.pixabay.com/photo/2025/11/23/09/04/dragonfly-9972089_1280.jpg

//POST: /auction/listings (endpoint for å lage listing)

export async function getListingsInfo() {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const getName = JSON.parse(localStorage.getItem("data"));
    // console.log(getName.name);
    const getCreditUrl = `${profilesUrl}/${getName.name}`;
    console.log(getCreditUrl);
    const getListingsUrl = `${profilesUrl}/${getName.name}/listings`;
    console.log(getListingsUrl);

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": CONFIG.apiKey,
      },
    };
    console.log(fetchOptions);
    const response = await fetch(getListingsUrl, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    const data = json.data;
    console.log(data);

    const listingContainer = document.querySelector(".listings-by-profile");
    const listingCard = document.createElement("div");
    listingCard.classList.add("display-listings-by-profile");
    listingCard.textContent = data.id;
    console.log(listingCard.textContent);

    listingContainer?.appendChild(listingCard);
  } catch (error) {
    console.log(error);
    displayErrorMessage();
  }
}

getListingsInfo();

export async function getAvatar() {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    const getName = JSON.parse(localStorage.getItem("data"));
    // console.log(getName.name);
    const getCreditUrl = `${profilesUrl}/${getName.name}`;
    console.log(getCreditUrl);
    const getAvatarUrl = `${profilesUrl}/${getName.name}/listings`;
    console.log(getAvatarUrl);

    const fetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": CONFIG.apiKey,
      },
    };
    console.log(fetchOptions);
    const response = await fetch(getAvatarUrl, fetchOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    const data = json.data;
    console.log(data);

    const avatarContainer = document.querySelector(".avatar-container");
    const avatarCard = document.createElement("div");
    avatarCard.classList.add("display-avatar");
    avatarCard.textContent = data.avatar;

    avatarContainer?.appendChild(avatarCard);
  } catch (error) {
    console.log(error);
    displayErrorMessage();
  }
}

// getAvatar();

function createNewListing() {
  createListingButton?.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Clicked");

    async function postNewListing(url, userData) {
      try {
        const token = localStorage.getItem("accessToken");
        const postData = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": CONFIG.apiKey,
          },
          body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
        displayErrorMessage();
      }
    }

    const newListingTitle = document.querySelector(
      "#createListingInputTitle",
    ).value;
    console.log(newListingTitle);
    const newListingDescription = document.querySelector(
      "#createListingInputDescription",
    ).value;
    console.log(newListingDescription);
    const newListingTags = document.querySelector(
      "#createListingInputTags",
    ).value;
    const splitTags = newListingTags.split(",");
    const newTags = splitTags.map((item) => item.trim());
    console.log(newListingTags);
    const newListingImgUrl = document.querySelector(
      "#createListingInputImageUrl",
    ).value;
    console.log(newListingImgUrl);
    const newListingImgAlt = document.querySelector(
      "#createListingInputImageAlt",
    ).value;
    console.log(newListingImgAlt);
    const newListingDateEnd = document.querySelector(
      "#createListingInputDateEnd",
    ).value;
    console.log(newListingDateEnd);

    const newListingInfo = {
      title: newListingTitle,
      description: newListingDescription,
      tags: newTags,
      media: [{ url: newListingImgUrl, alt: newListingImgAlt }],
      endsAt: newListingDateEnd,
    };
    console.log(newListingInfo);

    const newListingUrl = `${apiUrl}/auction/listings`;

    postNewListing(newListingUrl, newListingInfo);

    function successUpload(response) {
      if (response.status === 200) {
        const successMessage = "Successful upload";
        const notSuccessMessage = "Error in uploading. Please try again";
        const successContainer = document.querySelector(".successInfo");

        if (successContainer) {
          successContainer.textContent = successMessage;
        }
      } else {
        ("Failed to create new listing");
      }
    }
    successUpload();
  });
}

createNewListing();
