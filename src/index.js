import '../src/index.css';
import { createCard, toggleLikeCard, placesCardsList } from './components/cards';
import { closePopup, closePopupClickOnOverlay, openPopup } from './components/modal';

import { clearValidation, enableValidation } from './components/validation';
import { getCardsFromApi, getUserData, refreshUserData, sendCardToApi, refreshUserAvatar, deleteCardFromApi } from './components/api';

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



const popupRemove = document.querySelector('.popup_card__remove')
const cardRemoveForm = document.forms['delete-card']



const prepareTodeleteCard = (id) => {
  cardRemoveForm.setAttribute('id', id)
  openPopup(popupRemove);
};


const addCardToDOM = (card, method) => {
  const newCard = createCard(card, prepareTodeleteCard, openImageInPopup, toggleLikeCard, userId);
  placesCardsList[method](newCard);
};


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


const handleChangeAvatarFormSubmit = (evt) => {
  evt.preventDefault()
  addPreloader(evt)
  refreshUserAvatar(profileAvatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      removePreloader(evt)
      profileAvatarEditForm.reset()
      clearValidation(profileAvatarEditForm, validationConfig)
      closePopup(profileAvatarPopup)
    })

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
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      removePreloader(evt)
      clearValidation(profileEditForm, validationConfig)
      profileEditForm.reset()
      closePopup(profileEditPopup);
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
      addCardToDOM(card, 'prepend')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      removePreloader(evt)
      closePopup(addNewCardPopup);
    })
};


const fillProfileInputs = () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
};


const openImageInPopup = (evt) => {
  const cardImage = evt.target.closest('.card__image');
  imageInPopup.src = cardImage.src;
  imageInPopup.alt = cardImage.alt;
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
  profileEditForm.reset()
  clearValidation(profileEditForm, validationConfig)
  fillProfileInputs();
  openPopup(profileEditPopup);
});


profileAvatar.addEventListener('click', () => {
  profileAvatarEditForm.reset()
  clearValidation(profileAvatarEditForm, validationConfig)
  openPopup(profileAvatarPopup)
})


addNewCardButton.addEventListener('click', () => {
  addNewCardForm.reset()
  clearValidation(addNewCardForm, validationConfig)
  openPopup(addNewCardPopup)

});

cardRemoveForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardId = cardRemoveForm.getAttribute('id')
  const cardItem = document.getElementById(cardId)
  evt.submitter.textContent = 'Удаление'
  deleteCardFromApi(cardId)
    .then(() => {
      cardItem.remove()
      closePopup(popupRemove)

    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      evt.submitter.textContent = 'Да'
    })

});

profileEditForm.addEventListener('submit', handleProfileFormSubmit)

addNewCardForm.addEventListener('submit', handleAddCardFormSubmit)

profileAvatarEditForm.addEventListener('submit', handleChangeAvatarFormSubmit)


Promise.all([getUserData(), getCardsFromApi()])
  .then(([userData, cards]) => {
    userId = userData._id
    cards.forEach((card) => {
      addCardToDOM(card, 'append')
    })
    renderUserData(userData)
  })
  .catch((err) => {
    console.log(err)
  })

enableValidation(validationConfig)

console.log(document.cookie)