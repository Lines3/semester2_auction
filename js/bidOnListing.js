// //POST: /auction/listings/<id>/bids

import { CONFIG } from "./config.js";
import { displayErrorMessage } from "./errorMessage.js";
import { getParam } from "./displaySingleListing.js";
// import { profilesUrl } from "./credits.js";
// console.log(profilesUrl);
// const createListingContainer = document.querySelector(".create-listing");
const newBidButton = document.querySelector("#new-bid-btn");
// console.log(createListingButton);

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

// displayBids();

// const apiUrl = CONFIG.apiUrl;
// const createListingUrl = `${apiUrl}/auction/listings`;
// console.log(profilesUrl);

function newBidOnClick() {
  newBidButton?.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Clicked");

    const postNewBid = document.querySelector(".input-new-bid").value;
    console.log(postNewBid);
    const numericBid = parseInt(postNewBid);
    console.log(numericBid);

    async function placeNewBid(url, userData) {
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

    const newBidAmount = {
      //   media: [{ url: newListingImgUrl, alt: newListingImgAlt }],
      amount: numericBid,
    };
    console.log(newBidAmount);
    const id = getParam("id");
    const apiUrl = CONFIG.apiUrl;
    console.log(apiUrl);
    const newBidUrl = `${apiUrl}/auction/listings/${id}/bids`;
    console.log(newBidUrl);
    placeNewBid(newBidUrl, newBidAmount);

    function successUpload(response) {
      if (response.status === 200) {
        const successMessage = "Successful upload";
        const notSuccessMessage = "Error in uploading. Please try again";
        const successContainer = document.querySelector(".successInfo");

        if (successContainer) {
          successContainer.textContent = successMessage;
        }
      } else {
        console.log("Failed to make new bid");
      }
    }
    successUpload();
  });
}

newBidOnClick();
