import { apiMestoEndpoints } from "../api/apiMesto";

const createCard = (data, profileId, handleOpenDelete, likeCallback, handleClick) => {
  const template = document.querySelector('#card-template');
  const newCardElement = template.content.querySelector('.card').cloneNode(true);
  const imageElement = newCardElement.querySelector('.card__image');
  const titleElement = newCardElement.querySelector('.card__title');
  const likeButton = newCardElement.querySelector('.card__like-button');
  const deleteButton = newCardElement.querySelector('.card__delete-button');
  const likeCount = newCardElement.querySelector('.card__likes-count')

  imageElement.src = data.link;
  imageElement.alt = data.name;
  titleElement.textContent = data.name;
  likeCount.textContent = data.likes?.length ?? 0

  if (data.owner?._id && data.owner._id !== profileId) {
    deleteButton.style.display = 'none'
  }
  else {
    deleteButton.addEventListener('click', (event) => handleOpenDelete(event.target.closest('.card'), data._id))
  }
 
  if (data.likes.find(curElement => curElement._id === profileId) !== undefined) {
    likeButton.classList.add('card__like-button_is-active')
  }

  likeButton.addEventListener('click', (event) => likeCallback(event, data._id, likeCount))
  imageElement.addEventListener('click', () => handleClick(imageElement.src, imageElement.alt))
  return newCardElement;
}

const likeCard = async (event, dataId, likeCountElement) => {
  if (event.target.classList.contains('card__like-button_is-active')) {
    const data = await apiMestoEndpoints.unlikeCard(dataId)
    event.target.classList.remove('card__like-button_is-active')
    likeCountElement.textContent = data.likes.length
  }
  else {
    const data = await apiMestoEndpoints.likeCard(dataId)
    event.target.classList.add('card__like-button_is-active')
    likeCountElement.textContent = data.likes.length
  }
}

export { createCard, likeCard }