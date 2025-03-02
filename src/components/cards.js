import { deleteCardFromApi, addLikeOnCard, deleteLikeOnCard } from "./api";

export const placesCardsList = document.querySelector('.places__list');

export const createCard = (cardItem, cardDeleteHandler, cardImageHandler, cardLikeHandler, userId) => {
  const cardTemplate = document.getElementById('card-template').content;
  const placesCardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesCardItem.querySelector('.card__image');
  const cardTitle = placesCardItem.querySelector('.card__title');
  const cardLikeCount = placesCardItem.querySelector('.card__like-count')
  const cardLikeButton = placesCardItem.querySelector('.card__like-button')
  const cardDeleteButton = placesCardItem.querySelector('.card__delete-button')
  placesCardItem.dataset.id = cardItem._id
  placesCardItem.cardLikeCount = cardLikeCount

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
  cardItem.likes.filter((item) => {
    if (item._id === userId) {
      cardLikeButton.classList.add('card__like-button_is-active')
    }
  })
  return placesCardItem;
};

export const deleteCard = (evt) => {

  if (evt.target.classList.contains('card__delete-button')) {
    const cardItem = evt.target.closest('.places__item')
    const cardId = cardItem.dataset.id
    console.log(cardId)
    deleteCardFromApi(cardId)
      .then(() => {
        cardItem.remove();
      })
      .catch((err) => console.log(err))

  }
};

export const toggleLikeCard = (evt) => {
  const likeButton = evt.target.closest('.card__like-button');
  const cardItem = evt.target.closest('.places__item')
  const cardId = cardItem.dataset.id
  const likeCountElement = cardItem.cardLikeCount
  if (likeButton)
    if (likeButton.classList.contains('card__like-button_is-active')) {
      deleteLikeOnCard(cardId)
        .then((res) => {
          likeButton.classList.remove('card__like-button_is-active')
          likeCountElement.textContent = res.likes.length
        })
        .catch((err) => console.log(err))

    }
    else {
      addLikeOnCard(cardId)
        .then((res) => {
          likeButton.classList.add('card__like-button_is-active')
          likeCountElement.textContent = res.likes.length
        })
        .catch((err) => console.log(err))

    }
};

