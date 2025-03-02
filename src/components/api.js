const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-11',
  headers: {
    authorization: '68f93b82-a9de-4acf-969d-0e65b718b8be',
    'Content-Type': 'application/json'
  }
}

const checkResponseStatus = (res) => {
  if (res.ok) {

    return res.json();

  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getCardsFromApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponseStatus)
}

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(checkResponseStatus)
}

export const refreshUserData = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name: name,
      about: job
    })
  })
    .then(checkResponseStatus)
}

export const sendCardToApi = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
    .then(checkResponseStatus)
}

export const deleteCardFromApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
  })
    .then(checkResponseStatus)
}

export const refreshUserAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(checkResponseStatus)
}

export const addLikeOnCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
  })
    .then(checkResponseStatus)
}

export const deleteLikeOnCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers["Content-Type"]
    },
  })
    .then(checkResponseStatus)
}


