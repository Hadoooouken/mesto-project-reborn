
export const placesCardsList = document.querySelector('.places__list');

export const createCard = (cardItem, cardDeleteHandler, cardImageHandler, cardLikeHandler) => {
  const cardTemplate = document.getElementById('card-template').content;
  const placesCardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesCardItem.querySelector('.card__image');
  const cardTitle = placesCardItem.querySelector('.card__title');

  placesCardsList.addEventListener('click', cardDeleteHandler);
  cardImage.addEventListener('click', cardImageHandler);
  placesCardsList.addEventListener('click', cardLikeHandler);

  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;

  return placesCardItem;
};

export const deleteCard = (evt) => {
  if (evt.target.classList.contains('card__delete-button'))
    evt.target.closest('.places__item').remove();
};
export const toggleLikeCard = (evt) => {
  const likeButton = evt.target.closest('.card__like-button');
  if (likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
};

