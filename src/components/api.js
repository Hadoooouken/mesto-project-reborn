
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


// export const refreshUserData = () => {
//  return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: {
//       authorization: config.headers.authorization,
//       'Content-Type': config.headers["Content-Type"]
//     },
//     body: JSON.stringify({
//       name: 'Marie Skłodowska Curie',
//       about: 'Physicist and Chemist'
//     })
//   })
//     .then(console.log(checkResponseStatus))
//     .then((data) => {
//       console.log("Ответ от сервера:", data);
//       return data;
//     })
// } 

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

