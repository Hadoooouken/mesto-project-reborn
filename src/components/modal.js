export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupOnEscape);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEscape);
};

export const closePopupOnEscape = (evt) => {
  const popup = document.querySelector('.popup_is-opened');

  if (popup && evt.key.toLowerCase() === 'escape') {
    closePopup(popup);
  }
};

export const closePopupClickOnOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
