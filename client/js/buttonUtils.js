function handleButtonClick(button, nextStep, updateFunction) {
    const dataType = button.getAttribute("data-type");
    updateFunction(dataType);
    goToStep(nextStep);
  }