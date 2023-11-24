const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript: "js/intlTelInput/utils.js",
});

function setValidationIcon(inputIcon, isOkey) {
  let okeyIconPath = "/icons/okey.svg";
  let notOkeyIconPath = "/icons/not-okey.svg";

  let validationIcon = inputIcon.querySelector("img");

  if (!validationIcon) {
    // If no validation icon exists, create one
    validationIcon = document.createElement("img");
    inputIcon.appendChild(validationIcon);
  }

  if (!isOkey) {
    validationIcon.src = notOkeyIconPath;
    validationIcon.alt = "Validation Failed";
  } else {
    validationIcon.src = okeyIconPath;
    validationIcon.alt = "Validation Passed";
  }
}

function collectOTP() {
  let otp = "";
  for (let i = 1; i <= 4; i++) {
    let digit = document.getElementById(`otp${i}`).value;
    otp += digit;
  }

  return otp;
}

function validateZipCode(currentStep, nextStep, fromButtonClick = false) {
  // Get references to elements using their IDs and classes
  const zipCodeInput = document.getElementById(`zipCode-${currentStep}`);
  const zipCodeError = document.querySelector(`.zip-code-error.${currentStep}`);
  const inputIcon = document.querySelector(`.input-icon.${currentStep}`);

  if (zipCodeInput.value.length !== 5) {
    zipCodeError.textContent = "Please enter a valid 5-digit zip code";

    // Set the validation icon for failure
    setValidationIcon(inputIcon, false);

    return false;
  }

  // Clear the zip code error message
  zipCodeError.textContent = "";

  setValidationIcon(inputIcon, true);

  // Proceed to the next step only if the action comes from the button click
  if (fromButtonClick) {
    updateZipCode(zipCodeInput.value, currentStep);
    goToStep(nextStep);
  }
}

function validateEmail(currentStep, nextStep, fromButtonClick = false) {
  let emailInput = document.getElementById(`email`);
  let emailInputError = document.querySelector(
    `.zip-code-error.${currentStep}`
  );
  let inputIcon = document.querySelector(`.input-icon.${currentStep}`);
  let emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  if (!emailRegex.test(emailInput.value)) {
    emailInputError.textContent = "Please enter a valid email";

    setValidationIcon(inputIcon, false);

    return false;
  }

  emailInputError.textContent = "";

  setValidationIcon(inputIcon, true);

  if (fromButtonClick) {
    updateEmail(emailInput.value);
    goToStep(nextStep);
  }
}

// Validate phone number
function validatePhoneNumber(currentStep, nextStep, fromButtonClick = false) {
  const phoneInputError = document.querySelector(
    `.zip-code-error.${currentStep}`
  );
  const inputIcon = document.querySelector(`.input-icon.${currentStep}`);
  const phoneNumber = phoneInput.getNumber();

  if (!phoneInput.isValidNumber()) {
    phoneInputError.textContent = "Please enter a valid phone number.";
    setValidationIcon(inputIcon, false);
    return false;
  }

  phoneInputError.textContent = "";
  setValidationIcon(inputIcon, true);

  if (fromButtonClick) {
    sendVerificationCode(phoneNumber); // Call the function to send verification code
    updatePhoneNumber(phoneNumber);
    goToStep(nextStep);
  }
}

// Validate OTP
async function validateOTP(currentStep, nextStep) {
  const otp = collectOTP();
  const otpInputs = document.querySelectorAll(".otp-input");
  const phoneInputError = document.querySelector(
    `.zip-code-error.${currentStep}`
  );
  const phoneNumber = phoneInput.getNumber();

  if (otp && otp.length === 4) {
    const isOTPValid = await confirmOTP(phoneNumber, otp); // Call the function to confirm OTP code

    if (isOTPValid) {
      otpInputs.forEach((input) => {
        input.classList.remove("error");
      });
      phoneInputError.textContent = "";
      goToStep(nextStep);
    } else {
      otpInputs.forEach((input) => {
        input.classList.add("error");
      });
      phoneInputError.textContent = "Please enter a valid PIN code.";
    }
  }
}
