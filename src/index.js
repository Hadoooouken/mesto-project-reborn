import '../src/index.css';
import { createCard, deleteCard, toggleLikeCard, placesCardsList } from './components/cards';
import { initialCards } from './components/initialCardsMockData';
import { closePopup, closePopupClickOnOverlay, openPopup } from './components/modal';
import avatar from '../images/avatar.jpg';
import { clearValidation, enableValidation } from './components/validation';
import { getCardsFromApi, getUserData, refreshUserData } from './components/api';






const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
};




const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.forms['edit-profile'];
const profileNameInput = profileEditForm.elements.name;
const profileJobInput = profileEditForm.elements.description;
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const addNewCardPopup = document.querySelector('.popup_type_new-card');
const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardForm = document.forms['new-place'];
const addNewCardInputName = addNewCardForm.elements['place-name'];
const addNewCardInputImage = addNewCardForm.elements.link;

const imageViewerPopup = document.querySelector('.popup_type_image');
const imageInPopup = imageViewerPopup.querySelector('.popup__image');
const imageNameInPopup = imageViewerPopup.querySelector('.popup__caption');

const allPopups = document.querySelectorAll('.popup');
const allPopupCloseButtons = document.querySelectorAll('.popup__close');

enableValidation(validationConfig)

const renderUserData = (data) => {
  profileName.textContent = data.name
  profileJob.textContent = data.about
}


const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = profileNameInput.value;
  const jobValue = profileJobInput.value;
  refreshUserData(nameValue, jobValue)
    .then((res) => {
      renderUserData(res)
    }).catch((err) => {
      console.log(err)
    })
}


const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const cardNameValue = addNewCardInputName.value;
  const cardImageValue = addNewCardInputImage.value;
  const card = {
    name: cardNameValue,
    link: cardImageValue,
  };
  const newCard = createCard(card, deleteCard, openImageInPopup, toggleLikeCard);

  placesCardsList.prepend(newCard);
};

const fillProfileInputs = () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
};

const openImageInPopup = (evt) => {
  const cardImage = evt.target.closest('.card__image');

  imageInPopup.src = cardImage.src;
  imageInPopup.name = cardImage.alt;
  imageNameInPopup.textContent = cardImage.alt;
  openPopup(imageViewerPopup);
};


allPopupCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => {
    const currentOpenPopup = evt.target.closest('.popup');
    closePopup(currentOpenPopup);
  });
});

allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', closePopupClickOnOverlay);
});

profileEditButton.addEventListener('click', () => {
  clearValidation(profileEditForm, validationConfig)
  fillProfileInputs();
  openPopup(profileEditPopup);
});

addNewCardButton.addEventListener('click', () => {
  clearValidation(addNewCardForm, validationConfig)
  addNewCardForm.reset()
  openPopup(addNewCardPopup)

});

profileEditForm.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt)
  closePopup(profileEditPopup);
});

addNewCardForm.addEventListener('submit', (evt) => {
  handleAddCardFormSubmit(evt);
  closePopup(addNewCardPopup);

});

const promises = [getUserData(), getCardsFromApi()]

Promise.all(promises)
  .then(([userData, cards]) => {
    cards.forEach((card) => {
      placesCardsList.append(createCard(card, deleteCard, openImageInPopup, toggleLikeCard));
    })
    renderUserData(userData)
  })
  .catch((err) => {
    console.log(err)
  })





