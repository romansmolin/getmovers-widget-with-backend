const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript: "js/intlTelInput/utils.js",
});

function setValidationIcon(inputIcon, isOkey) {
  const iconPath = isOkey ? "/icons/okey.svg" : "/icons/not-okey.svg";
  const iconAlt = isOkey ? "Validation Passed" : "Validation Failed";

  let validationIcon = inputIcon.querySelector("img");

  if (!validationIcon) {
    validationIcon = document.createElement("img");
    inputIcon.appendChild(validationIcon);
  }

  validationIcon.src = iconPath;
  validationIcon.alt = iconAlt;
}

function validateInput(currentStep, nextStep, fromButtonClick, inputId, validationRegex, errorMessage, updateFunction, additionalValidation = () => true) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.querySelector(`.zip-code-error.${currentStep}`);
  const inputIcon = document.querySelector(`.input-icon.${currentStep}`);

  if (!validationRegex.test(inputElement.value) || (!additionalValidation(inputElement.value) && typeof additionalValidation === 'function')) {
    errorElement.textContent = errorMessage;
    setValidationIcon(inputIcon, false);
    return false;
  }

  errorElement.textContent = "";
  setValidationIcon(inputIcon, true);

  if (fromButtonClick) {
    updateFunction(inputElement.value);
    goToStep(nextStep);
  }
}

function validateZipCode(currentStep, nextStep, fromButtonClick = false) {
  const validationRegex = /^[0-9]*$/i;
  const errorMessage = "Please enter a valid 5-digit zip code";

  const additionalValidation = (value) => value.length === 5;

  validateInput(currentStep, nextStep, fromButtonClick, `zipCode-${currentStep}`, validationRegex, errorMessage, updateZipCode, additionalValidation);
}

function validateEmail(currentStep, nextStep, fromButtonClick = false) {
  const validationRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const errorMessage = "Please enter a valid email";

  validateInput(currentStep, nextStep, fromButtonClick, 'email', validationRegex, errorMessage, updateEmail)
}

function validateName(currentStep, nextStep, fromButtonClick = false) {
  const validationRegex = /^[A-Za-z\s'-]+$/;
  const errorMessage = "Please enter a valid name"

  validateInput(currentStep, nextStep, fromButtonClick, 'name', validationRegex, errorMessage, updateName)
}

function validatePhoneNumber(currentStep, nextStep, fromButtonClick = false) {
  const inputIcon = document.querySelector(`.input-icon.${currentStep}`);
  const phoneNumber = phoneInput.getNumber();
  const phoneInputError = document.querySelector(`.zip-code-error.${currentStep}`);
  const isValid = phoneInput.isValidNumber();

  phoneInputError.textContent = isValid ? "" : "Please enter a valid phone number.";
  setValidationIcon(inputIcon, isValid);

  if (isValid && fromButtonClick) {
    sendVerificationCode(phoneNumber);
    updatePhoneNumber(phoneNumber);
    goToStep(nextStep);
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

async function validateOTP(currentStep, nextStep) {
  const otp = collectOTP();
  const otpInputs = document.querySelectorAll(".otp-input");
  const phoneInputError = document.querySelector(`.zip-code-error.${currentStep}`);
  const phoneNumber = phoneInput.getNumber();

  if (otp && otp.length === 4) {
    const isOTPValid = await confirmOTP(phoneNumber, otp); 

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

  console.log(formData)
}
