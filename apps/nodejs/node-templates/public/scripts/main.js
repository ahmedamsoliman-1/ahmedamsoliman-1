const darkModeSwitch = document.getElementById("darkModeSwitch");
const body = document.body;

// Check for dark mode preference in local storage
const isDarkMode = localStorage.getItem("darkMode") === "true";

if (isDarkMode) {
  enableDarkMode();
}

darkModeSwitch.addEventListener("change", () => {
  if (darkModeSwitch.checked) {
    enableDarkMode();
    localStorage.setItem("darkMode", "true");
  } else {
    disableDarkMode();
    localStorage.setItem("darkMode", "false");
  }
});

function enableDarkMode() {
  body.classList.add("dark-mode");
  // Add dark mode class to specific jumbotron elements if needed
  document.querySelectorAll(".jumbotron").forEach((jumbotron) => {
    jumbotron.classList.add("dark-mode");
  });
}

function disableDarkMode() {
  body.classList.remove("dark-mode");
  // Remove dark mode class from specific jumbotron elements if needed
  document.querySelectorAll(".jumbotron").forEach((jumbotron) => {
    jumbotron.classList.remove("dark-mode");
  });
}




function Notifiy(message){
  console.log("NOTIFIT")
  Toastify({
    text: `${message}`,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    close: true
  }).showToast();
}

enableDarkMode()