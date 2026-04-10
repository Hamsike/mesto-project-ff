function hideError(formElement, inputElement, config) {
  inputElement.classList.remove(config.inputErrorClass)
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = ''
  errorElement.classList.remove(config.errorClass)
}

function showError(formElement, inputElement, config) {
  inputElement.classList.add(config.inputErrorClass)
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = inputElement.validationMessage
  errorElement.classList.add(config.errorClass)
}

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  }
  else {
    inputElement.setCustomValidity('')
  }
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, config)
  }
  else hideError(formElement, inputElement, config)
}

function setEventListeners(formElement, inputList, buttonElement, config) {
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config)
      togglebuttonElementState(inputList, buttonElement, config)
    })
  })
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

function togglebuttonElementState(inputList, buttonElement, config) {
  if (buttonElement.textContent === 'Сохранение...' || buttonElement.textContent === 'Удаление...') {
    return
  }
  const isInvalid = hasInvalidInput(inputList)
  if (isInvalid) {
    buttonElement.classList.remove(config.submitbuttonElementSelector)
    buttonElement.classList.add(config.inactivebuttonElementClass)
  }
  else {
    buttonElement.classList.remove(config.inactivebuttonElementClass)
    buttonElement.classList.add(config.submitbuttonElementSelector)
  }
  buttonElement.disabled = isInvalid
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitbuttonElementSelector);
  
  inputList.forEach(inputElement => {
    hideError(formElement, inputElement, config);
    inputElement.setCustomValidity('');
  });
  
  togglebuttonElementState(inputList, buttonElement, config);

  inputList.forEach(inputElement => {
    checkInputValidity(formElement, inputElement, config)
  })
}

export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector))
  forms.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitbuttonElementSelector)

    setEventListeners(formElement, inputList, buttonElement, config)
  })
}
