let passwordLabel = document.getElementById("password-label");
let copyNotification = document.getElementById("notification");

let options = [
  { string: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", checked: true },
  { string: "abcdefghijklmnopqrstuvwxyz", checked: true },
  { string: "0123456789", checked: true },
  { string: "!@#$%^&*", checked: false },
];

function showCopyNotification() {
  copyNotification.style.display = "block";
  setTimeout(function () {
    copyNotification.style.display = "none";
  }, 1000);
}

function copyToClipboard() {
  navigator.clipboard.writeText(passwordLabel.innerText);

  showCopyNotification();
}

function handleCheckboxClick(checkbox) {
  // toggle checked value
  options[checkbox.dataset.number].checked = !options[checkbox.dataset.number].checked;

  let checkedCount = countChecked();

  // if there is one checked checkbox left then disable, otherwise enable all checkboxes
  checkedCount == 1 ? disableLastCheckbox() : enableCheckboxes();
}

// count checked checkboxes
function countChecked() {
  let checkedCount = 0;
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) checkedCount++;
  }
  return checkedCount;
}

function disableLastCheckbox() {
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      let checkbox = document.querySelector(`[data-number="${i}"]`);
      checkbox.disabled = true;
      break;
    }
  }
}

function enableCheckboxes() {
  for (let i = 0; i < options.length; i++) {
    let checkbox = document.querySelector(`[data-number="${i}"]`);
    checkbox.disabled = false;
  }
}

// create an array with selected options and return it
function createSelectedOptions() {
  let selectedOptions = [];
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedOptions.push(options[i]);
    }
  }

  return selectedOptions;
}

function shufflePassword(password) {
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function generatePassword() {
  let passwordLength = document.getElementById("length").value;
  let generatedPassword = "";

  if (passwordLength > 32 || passwordLength < 4) return alert("Please enter a valid length.");

  // change font size based on password length so it doesn't overflow
  passwordLength > 20 ? (passwordLabel.style.fontSize = "22px") : (passwordLabel.style.fontSize = "30px");

  let selectedOptions = createSelectedOptions();
  let lastOption = 0;
  for (let i = 0; i < passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * selectedOptions[lastOption].string.length);
    generatedPassword += selectedOptions[lastOption].string.charAt(randomNumber);
    lastOption >= selectedOptions.length - 1 ? (lastOption = 0) : lastOption++;
  }

  passwordLabel.innerText = shufflePassword(generatedPassword);
}

generatePassword();
