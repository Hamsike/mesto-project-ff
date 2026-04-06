import '../styles/index.css';
import { createCard, removeCard, likeCard } from './card.js';
import { open, close } from './modal.js';
import avatarImage from '../images/avatar.jpg';
import { apiMestoEndpoints } from '../api/apiMesto.js';
import { clearValidation, enableValidation, validationSettings } from './validation.js';

const list = document.querySelector('.places__list')
const profileAvatar = document.querySelector('.profile__image')
const popups = document.querySelectorAll('.popup')
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const buttonsCloseModal = document.querySelectorAll('.popup__close')
const addCardButton = document.querySelector('.profile__add-button')
const loadingContent = document.querySelector('.content__loading')
const content = document.querySelector('.content')

let profileId = null
let configTarget = {
  currentCardElement: null,
  currentCardId: null
}

const buttonEdit = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')
const formElementEdit = document.forms['edit-profile'];
const nameInput = formElementEdit.elements.name;
const descriptionInput = formElementEdit.elements.description;
const buttonSumbitEdit = formElementEdit.elements.button

const popupTypeImage = document.querySelector('.popup_type_image')
const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')

const popupTypeNewCard = document.querySelector('.popup_type_new-card')
const formCardCreate = document.forms['new-place'];
const placeInput = formCardCreate.elements['place-name']
const urlInput = formCardCreate.elements.link
const buttonSubmitCreate = formCardCreate.elements.button

const popupDelete = document.querySelector('.popup_type_delete')
const buttonDelete = popupDelete.querySelector('.popup__button')

const handleOpenDeletePopup = (evt, cardId) => {
  open(popupDelete)
  clearValidation(popupDelete)
  const cardElement = evt.target.closest('.card')
  configTarget.currentCardId = cardId
  configTarget.currentCardElement = cardElement
}

export const toggleButtonClass = (buttonElement, isDisabled, text) => {
  if (isDisabled) {
    buttonElement.disabled = true
    buttonElement.textContent = text
  }
  else {
    buttonElement.disabled = false
    buttonElement.textContent = text
  }
  buttonElement.classList.toggle(validationSettings.submitbuttonElementSelector)
  buttonElement.classList.toggle(validationSettings.inactivebuttonElementClass)
}

const startLoadingContent = () => {
  loadingContent.classList.add('active')
  content.classList.remove('active')
}

const endLoadingContent = () => {
  loadingContent.classList.remove('active')
  content.classList.add('active')
}

const handleClickCard = (imageSrc, imageAlt) => {
  open(popupTypeImage);
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
};

const handleOpenPopupTypeNewCard = () => {
  open(popupTypeNewCard);
  clearValidation(popupTypeNewCard)
};

const handleOpenPopupEdit = () => {
  open(popupTypeEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(popupTypeEdit)
};

const handleEditFormSubmit = async (evt) => {
  evt.preventDefault();

  toggleButtonClass(buttonSumbitEdit, true, 'Сохранение...')

  const name = nameInput.value
  const description = descriptionInput.value
  const succes = await apiMestoEndpoints.updateProfile(name, description)
  if (succes) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    close(popupTypeEdit);
  }
  else {
    console.log('Ошибка')
  }

  toggleButtonClass(buttonSumbitEdit, false, 'Сохранить')
};

const handleCardCreateFormSubmit = async (evt) => {
  evt.preventDefault();

  toggleButtonClass(buttonSubmitCreate, true, 'Сохранение...')

  const data = {
    name: placeInput.value,
    link: urlInput.value
  }
  const response = await apiMestoEndpoints.addNewCard(data.name, data.link)

  if (response.success) {
    const newCard = createCard(
      response.data,
      profileId,
      handleOpenDeletePopup,
      likeCard,
      handleClickCard,
    );
    list.prepend(newCard);
    formCardCreate.reset();
    close(popupTypeNewCard);
  }
  else {
    console.log('Ошибка')
  }
  toggleButtonClass(buttonSubmitCreate, false, 'Сохранить')
};

const init = async () => {
  startLoadingContent()
  const [profile, cards] = await Promise.all([apiMestoEndpoints.getProfile(), apiMestoEndpoints.getCards()])
  endLoadingContent()
  enableValidation()

  profileAvatar.style.backgroundImage = `url(${avatarImage})`;
  profileName.textContent = profile.name
  profileDescription.textContent = profile.about
  profileId = profile._id

  popups.forEach(popup => popup.classList.add('popup_is-animated'));

  cards.forEach(data => {
    const card = createCard(data, profileId, handleOpenDeletePopup, likeCard, handleClickCard);
    list.append(card);
  });

  addCardButton.addEventListener('click', handleOpenPopupTypeNewCard);
  buttonEdit.addEventListener('click', handleOpenPopupEdit);
  formElementEdit.addEventListener('submit', handleEditFormSubmit);
  formCardCreate.addEventListener('submit', handleCardCreateFormSubmit);
  buttonDelete.addEventListener('click', () => removeCard(buttonDelete, popupDelete, configTarget))

  buttonsCloseModal.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector('.popup_is-opened');
      close(modal);
    });
  });
};

document.addEventListener('DOMContentLoaded', init)
