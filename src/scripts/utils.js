export const toggleButtonClass = (buttonElement, isDisabled, text, config) => {
  if (isDisabled) {
    buttonElement.disabled = true
    buttonElement.textContent = text
  }
  else {
    buttonElement.disabled = false
    buttonElement.textContent = text
  }
  buttonElement.classList.toggle(config.submitbuttonElementSelector)
  buttonElement.classList.toggle(config.inactivebuttonElementClass)
}