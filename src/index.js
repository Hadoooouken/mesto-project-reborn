import '../src/index.css';
import { createCard, deleteCard, toggleLikeCard, placesCardsList } from './components/cards';
import { initialCards } from './components/initialCardsMockData';
import { closePopup, closePopupClickOnOverlay, openPopup } from './components/modal';
import avatar from '../images/avatar.jpg';


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

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const nameValue = profileNameInput.value;
  const jobValue = profileJobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
};

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

initialCards.forEach((card) => {
  placesCardsList.append(createCard(card, deleteCard, openImageInPopup, toggleLikeCard));
});

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
  fillProfileInputs();
  openPopup(profileEditPopup);
});

addNewCardButton.addEventListener('click', () => { 
  addNewCardForm.reset()
  openPopup(addNewCardPopup)});

profileEditForm.addEventListener('submit', (evt) => {
  handleProfileFormSubmit(evt);
  closePopup(profileEditPopup);
});

addNewCardForm.addEventListener('submit', (evt) => {
  handleAddCardFormSubmit(evt);
  closePopup(addNewCardPopup);
  addNewCardForm.reset();
});






const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  formError.textContent = errorMessage
  formError.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = ''
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement,);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button')
  toggleButtonState(inputList, buttonElement)
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();


// Функция принимает массив полей

function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove('form__submit_inactive');
  }
};


