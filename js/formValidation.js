const form = document.querySelector(".loginForm");
const email = document.querySelector("#email");
const emailHelp = document.querySelector("#emailHelp");
const password = document.querySelector("#password");
const passwordHelp = document.querySelector("#passwordHelp");
console.log(passwordHelp);

export function validationLogin() {
  function validateForm() {
    if (checkPasswordLength(password.value, 1) === true) {
      passwordHelp.style.display = "none";
    } else {
      passwordHelp.style.display = "block";
    }

    if (validateEmail(email.value) === true) {
      emailHelp.style.display = "none";
    } else {
      emailHelp.style.display = "block";
    }
  }

  function validateEmail(email) {
    const noroffEmail = "@stud.noroff.no";
    if (email.endsWith(noroffEmail)) {
      emailHelp.style.display = "none";
    } else {
      emailHelp.style.display = "block";
    }
  }

  function checkPasswordLength(value) {
    if (value.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  validateForm();
}
