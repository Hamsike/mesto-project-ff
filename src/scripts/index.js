import '../styles/index.css';
import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard } from './card.js';
import { open, close } from './modal.js';
import avatarImage from '../images/avatar.jpg';

const list = document.querySelector('.places__list')
const profileAvatar = document.querySelector('.profile__image')
const popups = document.querySelectorAll('.popup')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const buttonsCloseModal = document.querySelectorAll('.popup__close')
const addCardButton = document.querySelector('.profile__add-button')

const buttonEdit = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const formElementEdit = document.forms['edit-profile'];
const nameInput = formElementEdit.elements.name;
const descriptionInput = formElementEdit.elements.description;

const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')

const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const formCardCreate = document.forms['new-place'];
const placeInput = formCardCreate.elements['place-name']
const urlInput = formCardCreate.elements.link

const handleClickCard = (imageSrc, imageAlt) => {
  open(popupTypeImage);
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
};

const handleOpenPopupTypeNewCard = () => {
  open(popupTypeNewCard);
};

const handleOpenPopupEdit = () => {
  open(popupTypeEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  close(popupTypeEdit);
};

const handleCardCreateFormSubmit = (evt) => {
  evt.preventDefault();
  const newCard = createCard(
    {
      name: placeInput.value,
      link: urlInput.value
    },
    removeCard,
    likeCard,
    handleClickCard
  );
  list.prepend(newCard);
  formCardCreate.reset();
  close(popupTypeNewCard);
};

const init = () => {
  profileAvatar.style.backgroundImage = `url(${avatarImage})`;
  
  popups.forEach(popup => popup.classList.add('popup_is-animated'));
  
  initialCards.forEach(data => {
    const card = createCard(data, removeCard, likeCard, handleClickCard);
    list.append(card);
  });
  
  addCardButton.addEventListener('click', handleOpenPopupTypeNewCard);
  buttonEdit.addEventListener('click', handleOpenPopupEdit);
  formElementEdit.addEventListener('submit', handleEditFormSubmit);
  formCardCreate.addEventListener('submit', handleCardCreateFormSubmit);
  
  buttonsCloseModal.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector('.popup_is-opened');
      close(modal);
    });
  });
};

document.addEventListener('DOMContentLoaded', init)
