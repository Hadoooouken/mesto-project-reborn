const showInputError = (formElement, inputElement, errorMessage, config) => {

    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    formError.textContent = errorMessage
    formError.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {

    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    formError.classList.remove(config.errorClass);
    formError.textContent = ''
};

const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const setEventListeners = (formElement, config) => {

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, config)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config)
            toggleButtonState(inputList, buttonElement, config)
        });
    });
};

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};



function toggleButtonState(inputList, buttonElement, config) {

    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};


export function clearValidation(formElement, config) {
    const button = formElement.querySelector(config.submitButtonSelector)
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    inputList.forEach((input) => {
        hideInputError(formElement, input, config)

    })
    toggleButtonState(inputList, button, config)

}

