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


// You can expand this to add more functionality as needed
