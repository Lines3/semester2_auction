const myPageLink = document.querySelector("#myPageLink");

export function checkLogin() {
  myPageLink?.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("clickes the bibi");

    const loggedIn = localStorage.getItem("accessToken");

    if (loggedIn) {
      window.location.href = "/my_page.html";
    } else {
      window.location.href = "/login.html";
    }
  });
}

checkLogin();
