import { initialCards } from "./cards.js";

const createCard = (data, deleteCallback) => {
  const template = document.querySelector('#card-template');
  const newCardElement = template.content.cloneNode(true);

  const imageElement = newCardElement.querySelector('.card__image');
  const titleElement = newCardElement.querySelector('.card__title');

  imageElement.src = data.link;
  imageElement.alt = data.name;
  titleElement.textContent = data.name;

  const deleteButton = newCardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', (el) => {
    const item = el.target.closest('.places__item');
    deleteCallback(item);
  });

  return newCardElement;
};

const placesList = document.querySelector('.places__list');

const removeCard = element => {
  element.remove();
};

const renderInitialCards = () => {
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, removeCard);
    placesList.appendChild(cardElement);
  });
};

renderInitialCards();
