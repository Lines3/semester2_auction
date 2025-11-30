export function displayErrorMessage() {
  console.log("Line's error message");
  const errorContainer = document.querySelector(".displayErrorMessage");
  const errorMessage = `We apologize. An error occurred. Try again later`;
  errorContainer.textContent = errorMessage;
}
