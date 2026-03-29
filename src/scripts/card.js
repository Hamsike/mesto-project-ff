const createCard = (data, deleteCallback, likeCallback, handleClick) => {
  const template = document.querySelector('#card-template');
  const newCardElement = template.content.querySelector('.card').cloneNode(true);
  const imageElement = newCardElement.querySelector('.card__image');
  const titleElement = newCardElement.querySelector('.card__title');
  const likeButton = newCardElement.querySelector('.card__like-button');
  const deleteButton = newCardElement.querySelector('.card__delete-button');

  imageElement.src = data.link;
  imageElement.alt = data.name;
  titleElement.textContent = data.name;

  deleteButton.addEventListener('click', deleteCallback)
  likeButton.addEventListener('click', likeCallback)
  imageElement.addEventListener('click', () => handleClick(imageElement.src, imageElement.alt))
  return newCardElement;
}

const removeCard = event => {
  const item = event.target.closest('.card')
  item.remove()
};

const likeCard =(event) => {
  event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, removeCard, likeCard }