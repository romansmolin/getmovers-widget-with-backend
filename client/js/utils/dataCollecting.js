const formData = {};

function handleButtonClick(button, nextStep, updateFunction) {
  const dataType = button.getAttribute("data-type");
  updateFunction(dataType);
  goToStep(nextStep);
}

// Update the ZIP code based on the current step
function updateZipCode(zipCode, currentStep) {
  currentStep === "step-1"
    ? (formData["ozip"] = zipCode)
    : (formData["dzip"] = zipCode);
}

// Update property type and dynamic values
function updatePropertyType(propertyType) {
  const dynamicValues = document.querySelectorAll(".input-from-step-2");
  dynamicValues.forEach((item) => {
    item.textContent = propertyType;
  });
  formData["propertyType"] = propertyType;
}

// Update property size
function updatePropertySize(size) {
  const dynamicValue = document.querySelector(".input-from-step-3");
  dynamicValue.textContent = size;
  formData["movesize"] = size;
}

// Update email
function updateEmail(email) {
  formData["email"] = email;
}

// Update compare-to value
function updateComapreTo(aptSize) {
  formData["1br_apt_size"] = aptSize;
}

// Update moving date
function updateMovingDate(movingDate) {
  formData["movedte"] = movingDate;
}

// Update phone number and dynamic value
function updatePhoneNumber(phoneNumber) {
  const dynamicValue = document.querySelector(".phone-number-part");
  dynamicValue.textContent = phoneNumber;

  formData["phone1"] = phoneNumber;
}
