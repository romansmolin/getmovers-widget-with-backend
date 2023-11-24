const formData = {};

function updateZipCode(zipCode, currentStep) {
  currentStep === "step-1"
    ? (formData["ozip"] = zipCode)
    : (formData["dzip"] = zipCode);
}

function updatePropertyType(propertyType) {
  const dynamicValues = document.querySelectorAll(".input-from-step-2");
  dynamicValues.forEach((item) => {
    item.textContent = propertyType;
  });
  formData["propertyType"] = propertyType;
}

function updatePropertySize(size) {
  const dynamicValue = document.querySelector(".input-from-step-3");
  dynamicValue.textContent = size;
  formData["movesize"] = size;
}

function updateEmail(email) {
  formData["email"] = email;
}

function updateComapreTo(aptSize) {
  formData["1br_apt_size"] = aptSize;
}

function updateMovingDate(movingDate) {
  formData["movedte"] = movingDate;
}

function updatePhoneNumber(phoneNumber) {
  const dynamicValue = document.querySelector(".phone-number-part");
  dynamicValue.textContent = phoneNumber;

  formData["phone1"] = phoneNumber;
}

function updateName(name) {
    formData["name"] = name;
}
