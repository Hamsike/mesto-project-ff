const open = (popupElement) => {
  popupElement.classList.add('popup_is-opened');
  popupElement.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleEscape)
}

const close = (popupElement) => {
  popupElement.classList.remove('popup_is-opened');
  popupElement.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleEscape)
}

const handleEscape = (event) => {
  if (event.key === "Escape") {
        const modal = document.querySelector('.popup_is-opened');
        close(modal)
    }
}

const handleClick = (event) => {
  if (event.target === event.currentTarget) {
    const modal = document.querySelector('.popup_is-opened')
    close(modal)
  }
}

export {open, close}