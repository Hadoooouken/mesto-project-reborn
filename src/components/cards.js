import { deleteCardFromApi } from "./api";

export const placesCardsList = document.querySelector('.places__list');

export const createCard = (cardItem, cardDeleteHandler, cardImageHandler, cardLikeHandler, userId) => {
  const cardTemplate = document.getElementById('card-template').content;
  const placesCardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesCardItem.querySelector('.card__image');
  const cardTitle = placesCardItem.querySelector('.card__title');
  const cardLikeCount = placesCardItem.querySelector('.card__like-count')
  const cardDeleteButton = placesCardItem.querySelector('.card__delete-button')
  placesCardItem.dataset.id = cardItem._id

  placesCardsList.addEventListener('click', cardDeleteHandler);
  cardImage.addEventListener('click', cardImageHandler);
  placesCardsList.addEventListener('click', cardLikeHandler);

  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  cardLikeCount.textContent = cardItem.likes.length
  if (cardItem.owner._id !== userId) {
    cardDeleteButton.remove()
  }
  // console.log('Айди карточки:', cardItem._id)
  // console.log('Владелец карточки:', cardItem.owner._id)
  return placesCardItem;
};

export const deleteCard = (evt) => {

  if (evt.target.classList.contains('card__delete-button')) {
    const cardItem = evt.target.closest('.places__item')
    const cardId = cardItem.dataset.id
    deleteCardFromApi(cardId)
      .then(() => {
        cardItem.remove();
      })
      .catch((err) => console.log(err))

  }
};



// export const toggleLikeCard = (evt) => {
//   const likeButton = evt.target.closest('.card__like-button');
//   if (likeButton) {
//     likeButton.classList.toggle('card__like-button_is-active');
//   }
// };

export const toggleLikeCard = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    console.log(evt.target.classList.contains('card__like-button'))
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

