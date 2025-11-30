import { CONFIG } from "./config.js";
import { displayErrorMessage } from "./errorMessage.js";
import { checkLogin } from "./biBi.js";

checkLogin();

const apiUrl = CONFIG.apiUrl;

export async function showListings(url) {
  try {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);

    const data = json.data;

    const row = document.createElement("div");
    row.classList.add("row", "row-cols-1", "row-cols-md-2", "g-4");

    for (let i = 0; i < data.length; i++) {
      const listingCards = document.querySelector(".listingsCards");
      const col = document.createElement("div");
      col.classList.add("col");
      const card = document.createElement("div");
      card.classList.add("card");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = data[i].title;
      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.textContent = data[i].description;
      const listingLink = document.createElement("a");
      listingLink.classList.add("listing-link");
      listingLink.href = `/single_Listing.html?id=${data[i].id}`;

      const media = data[i].media;

      if (media.length > 0) {
        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = media[0].url;
        img.alt = media[0].alt;

        card.appendChild(img);
      } else {
        const div = document.createElement("div");
        div.style.height = "200px";
        div.style.background = "black";
        card.appendChild(div);
      }

      cardBody.appendChild(cardText);
      cardBody.appendChild(cardTitle);

      card.appendChild(cardBody);
      listingLink.appendChild(card);
      col.appendChild(listingLink);
      row.appendChild(col);
      listingCards?.appendChild(row);
    }
  } catch (error) {
    console.log(error);
    displayErrorMessage();
  }
}

const listingsUrl = `${apiUrl}/auction/listings?_active=true`;

showListings(listingsUrl);
