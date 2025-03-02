import '../src/index.css';
import { createCard, deleteCard, toggleLikeCard, placesCardsList } from './components/cards';
import { closePopup, closePopupClickOnOverlay, openPopup } from './components/modal';

import { clearValidation, enableValidation } from './components/validation';
import { getCardsFromApi, getUserData, refreshUserData, sendCardToApi, refreshUserAvatar } from './components/api';


let userId = null



const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
};



const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.forms['edit-profile'];
const profileNameInput = profileEditForm.elements.name;
const profileJobInput = profileEditForm.elements.description;
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarPopup = document.querySelector('.popup_avatar_changed')


const profileAvatarEditForm = document.forms['avatar-change']
const profileAvatarInput = profileAvatarEditForm.elements.avatar


const handleChangeAvatarFormSubmit = (evt) => {
  evt.preventDefault()
  refreshUserAvatar(profileAvatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`
    })
    .catch((err) => {
console.log(err)
    })

}


profileAvatar.addEventListener('click', () => {
  openPopup(profileAvatarPopup)
})


profileAvatarEditForm.addEventListener('submit', (evt) => {
  handleChangeAvatarFormSubmit(evt)
  closePopup(profileAvatarPopup)
})





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
  profileAvatar.style.backgroundImage = `url(${data.avatar})`
}

const addPreloader = (evt) => {
  evt.submitter.textContent = 'Сохранение...'
}

const removePreloader = (evt) => {
  evt.submitter.textContent = 'Сохранить'
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const nameValue = profileNameInput.value;
  const jobValue = profileJobInput.value;
  addPreloader(evt)
  refreshUserData(nameValue, jobValue)
    .then((res) => {
      renderUserData(res)
    })
    .then(() => {
      removePreloader(evt)
      clearValidation(profileEditForm, validationConfig)
      profileEditForm.reset()
    })
    .catch((err) => {
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
  addPreloader(evt)
  sendCardToApi(card)
    .then((card) => {
      const newCard = createCard(card, deleteCard, openImageInPopup, toggleLikeCard, userId);
      placesCardsList.prepend(newCard);
    })
    .then(() => {
      removePreloader(evt)

    })

    .catch((err) => {
      console.log(err)
    })
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
  addNewCardForm.reset()
  clearValidation(addNewCardForm, validationConfig)
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
    console.log(userData.avatar)
    userId = userData._id
    cards.forEach((card) => {
      placesCardsList.append(createCard(card, deleteCard, openImageInPopup, toggleLikeCard, userId));
    })
    renderUserData(userData)
  })
  .catch((err) => {
    console.log(err)
  })



