import { checkLogin } from "./biBi.js";

checkLogin();

function logout() {
  localStorage.clear();
}

function logoutClick() {
  const logoutBtn = document.querySelector("#logout-btn");
  logoutBtn?.addEventListener("click", (event) => {
    event?.preventDefault();
    console.log("clicked it");

    logout();
    window.location.href = "/logout.html";
  });
}

logoutClick();

// make the logout function run when clicking logout button
//prevent going to my page when not logged in and be directed to the login page instead
