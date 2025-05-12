import { addLikeOnCard, deleteLikeOnCard } from "./api";

export const placesCardsList = document.querySelector('.places__list');

export const createCard = (cardItem, cardDeleteHandler, cardImageHandler, cardLikeHandler, userId) => {
  const cardTemplate = document.getElementById('card-template').content;
  const placesCardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = placesCardItem.querySelector('.card__image');
  const cardTitle = placesCardItem.querySelector('.card__title');
  const cardLikeCount = placesCardItem.querySelector('.card__like-count')
  const cardLikeButton = placesCardItem.querySelector('.card__like-button')
  const cardDeleteButton = placesCardItem.querySelector('.card__delete-button')

  placesCardItem.setAttribute('id', cardItem._id)
  const cardId = placesCardItem.getAttribute('id')

  cardDeleteButton.addEventListener('click', () => {
    cardDeleteHandler(cardId)
  });
  cardImage.addEventListener('click', cardImageHandler);
  cardLikeButton.addEventListener('click', cardLikeHandler);

  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardTitle.textContent = cardItem.name;
  cardLikeCount.textContent = cardItem.likes.length
  if (cardItem.owner._id !== userId) {
    cardDeleteButton.remove()
  }
  if (cardItem.likes.some(item => item._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active')
  }
  return placesCardItem;
};

export const toggleLikeCard = (evt) => {
  const cardItem = evt.target.closest('.places__item')
  const cardLikeButton = evt.target.closest('.card__like-button');
  const cardLikeCount = cardItem.querySelector('.card__like-count')
  const cardId = cardItem.id
  const likeApiMethod = cardLikeButton.classList.contains('card__like-button_is-active')
    ? deleteLikeOnCard
    : addLikeOnCard;

  likeApiMethod(cardId)
    .then((res) => {
      cardLikeButton.classList.toggle('card__like-button_is-active');
      cardLikeCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}

//   if (likeButton)
//     if (likeButton.classList.contains('card__like-button_is-active')) {
//       deleteLikeOnCard(cardId)
//         .then((res) => {
//           likeButton.classList.remove('card__like-button_is-active')
//           likeCountElement.textContent = res.likes.length
//         })
//         .catch((err) => console.log(err))

//     }
//     else {
//       addLikeOnCard(cardId)
//         .then((res) => {
//           likeButton.classList.add('card__like-button_is-active')
//           likeCountElement.textContent = res.likes.length
//         })
//         .catch((err) => console.log(err))

//     }
// };

