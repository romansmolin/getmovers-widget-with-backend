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

function validatePhoneNumber(currentStep, nextStep, fromButtonClick = false) {
  let phoneInputError = document.querySelector(
    `.zip-code-error.${currentStep}`
  );
  let inputIcon = document.querySelector(`.input-icon.${currentStep}`);

  if (!phoneInput.isValidNumber()) {
    phoneInputError.textContent = "Please enter valid phone number.";

    setValidationIcon(inputIcon, false);

    return false;
  }

  phoneInputError.textContent = "";

  setValidationIcon(inputIcon, true);

  if (fromButtonClick) {
    updatePhoneNumber(phoneInput.getNumber());

    fetch("/send-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phoneInput.getNumber() }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Verification sent:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    console.log(formData);
    goToStep(nextStep);
  }
}

async function validateOTP(currentStep, nextStep) {
  const otp = collectOTP();

  if (otp && otp.length === 4) {
    try {
      const response = await fetch("/confirm-otp-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneInput.getNumber(), code: otp }),
      });
      const data = await response.json();

      if (data.valid) {
        console.log("Verification code is approved");
        goToStep(nextStep);
      } else {
        console.error("Invalid OTP code");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

