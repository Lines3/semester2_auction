import { CONFIG } from "./config.js";
import { displayErrorMessage } from "./errorMessage.js";
import { checkLogin } from "./biBi.js";

checkLogin();

export function userLoggedIn() {
  console.log("user is logged in");

  const loggedIn = localStorage.getItem("accessToken");

  if (loggedIn) {
    getParam("id");
    displayBids();
    displayListing();
  } else {
    window.location.href = "/login.html";
  }
}

userLoggedIn();

export function getParam(param) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const value = params.get(param);
  console.log(value);
  return params.get(param);
}

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

export async function getBids(id) {
  if (!id) {
    throw new Error("No id provided");
  }

  const url = `${CONFIG.apiUrl}/auction/listings/${id}?_bids=true`;
  console.log(url);

  const response = await fetch(url);
  const json = await response.json();
  console.log(json);

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Fetching listing failed");
  }
  console.log(json);
  return json;
}

export async function displayBids() {
  const id = getParam("id");
  console.log(id);

  if (!id) {
    window.location.href = "/";
  }
  const container = document.querySelector("#listing-container");

  try {
    const allBids = await getBids(id);
    console.log(allBids);

    const bids = allBids.data.bids;
    console.log(bids);
    bids.forEach((bid) => {
      console.log("bidder:" + bid.bidder.name);
      updateBidAmount(bid.amount);
      updateBidder(bid.bidder.name);
    });
  } catch (error) {
    console.log(error);
    displayErrorMessage();
  }
}

displayBids();

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

export function updateBidAmount(newBids) {
  const showbids = document.querySelector("h3");
  if (showbids) {
    showbids.textContent = `Listing bids: ${newBids}`;
  }
}

export function updateEndsAt(newEndsAt) {
  const endsAt = document.querySelector("h4");
  if (endsAt) {
    endsAt.textContent = `Bidding ends at: ${newEndsAt}`;
  }
}

export function updateBidder(newBidder) {
  const showbids = document.querySelector("h5");
  if (showbids) {
    showbids.textContent = `Name of bidder: ${newBidder}`;
  }
}

export function renderListing(container, listing) {
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
    console.log(listing);

    const { title } = listing.data;
    const { description } = listing.data;
    const { endsAt } = listing.data;
    console.log(description);
    console.log(listing);
    updateHeading(title);
    updateTitle(title);
    renderListing(container, listing.data.media[0]);
    updateDescription(description);
    updateEndsAt(endsAt);
  } catch (error) {
    console.log(error);
    displayErrorMessage();
  }
}
