function goToStep(stepNumber) {
  hideAllSteps();
  document.getElementById(`step-${stepNumber}`).classList.add("active-step");
}

function goBack(stepNumber) {
  hideAllSteps();
  document.getElementById(`step-${stepNumber}`).classList.add("active-step");
}

function hideAllSteps() {
  var steps = document.querySelectorAll(".form-step");
  steps.forEach(function (step) {
    step.classList.remove("active-step");
  });
}

function handleButtonClick(button, nextStep, updateFunction) {
  const dataType = button.getAttribute("data-type");
  updateFunction(dataType);
  goToStep(nextStep);
}

const otpInputs = document.querySelectorAll(".otp-input");

otpInputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    const value = e.target.value;
    if (value.length === 1 && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus(); // Move focus to the next input
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      // Only allow single digits
      e.preventDefault();
      input.value = e.key;
    }
  });
});

