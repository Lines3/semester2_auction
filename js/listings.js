// import { displayError } from "../temporaryComponents/temporary.js";

// const resultsContainer = document.querySelector(".results");
// const url = "https://v2.api.noroff.dev/auction/listings";
// // const proxy = "https://noroffcors.onrender.com/";
// // const corsFix = proxy + url;

// async function getListings() {
//   try {
//     const response = await fetch(url);
//     const json = await response.json();

//     console.log(json);

//     resultsContainer.innerHTML = "";

//     const listings = json;

//     listings.forEach(function (listing) {
//       resultsContainer.innerHTML += `${listing.id}" class="result">
//     <h3>${listing.title}</h3>
//     <h4>${listing.description}</h4>
//     <h5>${listing.updated}</h5>
//     </a>`;
//     });
//   } catch (error) {
//     resultsContainer.innerHTML = displayError("Oops! An Error occurred");
//     console.log(resultsContainer);
//   }
// }
// getListings();

fetch("https://v2.api.noroff.dev/auction/listings")
  .then((response) => {
    console.log("status code:", response.status);
    return response.json();
  })
  .then((json) => console.log(json));
