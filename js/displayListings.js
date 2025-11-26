import { CONFIG } from "./config.js";

// // New code start

export function getParam(param) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const value = params.get(param);
  console.log(value);
  return params.get(param);
}

getParam("id");

export async function getListing(id) {
  if (!id) {
    throw new Error("No id provided");
  }

  const url = `${CONFIG.apiUrl}/auction/listings/${id}`;

  const response = await fetch(url);
  const json = await response.json();
  console.log(json);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching listing failed");
  }
  console.log(json);
  return json;
}

export function updateHeading(newHeading) {
  const heading = document.querySelector("h1");
  if (heading) {
    heading.textContent = `Listing heading: ${newHeading}`;
  }
}

export function updateDescription(newDescription) {
  const description = document.querySelector("h2");
  if (description) {
    description.textContent = `Listing description: ${newDescription}`;
  }
}

export function updateTitle(newTitle) {
  document.title = newTitle;
}

export function updateDescriptionText(newText) {
  document.description = newText;
}

export function renderListing(container, listing) {
  //   container.innerHTML = "";
  const img = document.createElement("img");
  console.log(listing);
  img.src = listing.url;
  console.log(img.src);
  img.alt = listing.alt;
  console.log(img.alt);
  container.appendChild(img);
}

export async function displayListing() {
  const id = getParam("id");

  if (!id) {
    window.location.href = "/";
  }
  const container = document.querySelector("#listing-container");

  try {
    const listing = await getListing(id);
    const { title } = listing.data;
    const { description } = listing.data;
    console.log(description);
    console.log(listing);
    updateHeading(title);
    updateTitle(title);
    renderListing(container, listing.data.media[0]);
    updateDescription(description);
    updateDescriptionText(description);
  } catch (error) {
    console.log(error);
    // displayMessage(container, "error", error.message);
  }
}
displayListing();

// // new code end
