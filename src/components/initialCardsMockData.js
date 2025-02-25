export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// const validate = (hasAccess) => {
//   if (hasAccess) {
//     return () => console.log('разрешен');
//   } else {
//     return () => console.log('запрещен');
//   }
// };

// const adminValidation = validate(true);
// const guestValidation = validate(false);

// adminValidation()
// guestValidation()

// const myObj = {
//   first: 1,
//   second: 2,
//   third: 3
// };

// console.log(myObj)
// const key = myObj[first]

// myObj[key] = 'first'
// console.log(myObj)

// const obj = {
//   first: 1,
//   second: 2,
//   third: 3,
// };

// const value = Object.values(obj)
// console.log(`Значения свойств Объекта:${value}`)
// const key = Object.keys(obj)
// console.log(` Ключи Объекта:${key}`)

// const obj2 = {

// }
// const newObj = {};
// for (let key in obj) {

//   obj2[key] = obj[key]

// }

// console.log(obj);
// console.log(obj2)
// console.log(obj2)

// const joinNumbersFromRange = (startIndex, lastIndex) => {
//   let i = startIndex;
//   let res = '';
//   while (i <= lastIndex) {
//     res += i;
//     i++;
//   }
//   return res;
// };

// const mySubstr = (string, subStingSymbol) => {
//   let res = ''
//   let i = 0
//   while (i <= subStingSymbol) {
//     console.log(string[0])
//     res += string[i]
//     i++
//   }
//   return res
// }

// countChars = (string, symbol) => {
//   let res = 0
//   let i = 0
//   while (i < string.length) {
//     if (string[i].toLowerCase() === symbol.toLowerCase()) {
//       console.log(string[i])
//       res += 1
//     }
//     i++
//   }
//   return res
// }

// console.log(countChars("Филипп", 'п'))

// const makeItFunny = (string, symbol) => {
//   let res = '';
//   let i = 0;
//   while (i < string.length) {
//     if (i% symbol === 0) {
//       res += string[i].toUpperCase();
//     } else {
//       res += string[i];
//     }
//     i++;
//   }
//   return res;
// };

// const encrypt = (word) => {
//   let res = '';

//   for (let i = 0; i < word.length; i += 2) {
//     if (word[i + 1] !== undefined) {
//       res += word[i + 1] + word[i]; // Меняем местами пару символов
//     } else {
//       res += word[i]; // Если это последний символ
//     }
//   }

//   return res;
// };

// const header = document.querySelector('.header');
// function handleImageLoad(evt) {
//   document.body.append(evt.target);
// }

// const handleImageError = () => {
//   console.log('шото пошло не так');
//   const errorDiv = document.createElement('div');
//   errorDiv.textContent = 'шото пошло не так';
//   errorDiv.style.color = 'red';

//   header.append(errorDiv);
// };

// function loadImage(imageUrl, loadCallback, errorCallback) {
//   const img = document.createElement('img');
//   img.src = imageUrl;
//   img.onload = loadCallback;
//   img.onerror = errorCallback;
// }

// loadImage(
//   'https://pictures.s3.yandex.net/frontend-developer/functions/dogoo-1.jpg',
//   handleImageLoad,
//   handleImageError
// // );

// const header = document.querySelector('.header');
// // function handleImageLoad(evt) {
// //   document.body.append(evt.target);
// // }

// // const handleImageError = () => {
// //   console.log('шото пошло не так');
// //   const errorDiv = document.createElement('div');
// //   errorDiv.textContent = 'шото пошло не так';
// //   errorDiv.style.color = 'red';

// //   header.append(errorDiv);
// // };

// function loadImage(imageUrl) {
//   return new Promise((resolve, reject) => {
//     const img = document.createElement('img');
//     img.src = imageUrl;
//     img.onload = resolve;
//     img.onerror = reject;
//   });
// }

// loadImage('https://pictures.s3.yandex.net/frontend-developer/functions/dog-1.jpg')
//   .then((evt) => {
//     console.log('промис:', evt);
//     document.body.append(evt.target);
//   })
//   .catch(() => {
//     console.error('Всё идёт не по плану.');
//   });

// function lovefunc(flower1, flower2) {
//   if ((flower1 % 2 === 0 && flower2 % 2 !== 0) || (flower1 % 2 !== 0 && flower2 % 2 === 0)) {
//     return true;
//   }
// }

// function findNeedle(haystack) {
//   haystack.forEach((arr, index) => {
//     if (haystack.includes('needle')) {
//       console.log(`"found the needle at position" ${index}`);
//     }
//   });
// }

// var myCrazyObject = {
//   "name": "Нелепый объект",
//   "some array": [7, 9, { purpose: "путаница", number: 123 }, 3.3],
//   "random animal": "Банановая акула"
//   }

//   console.log(myCrazyObject['some array'][3])

// let a = 5,
//   b = 10;

// [a, b] = [b, a];
// console.log(a, b); // Должно вывести: 10 5

// const user = {
//   name: 'Алиса',
//   age: 22,
//   address: {
//     city: 'Казань',
//     country: 'Россия',
//   },
// };

// const {name, address: { city }} = user;

// console.log(name, city);

// const user2 = { name2: 'Иван', age2: 30 };
// const { name2, age2, isAdmin = 'false' } = user2;
// console.log(isAdmin); // Должно вывести: false

// const colors = ["красный", "зеленый", "синий"];

// // Меняем местами первый и последний элементы
// [colors[0], colors[2]] = [colors[2], colors[0]];

// console.log(colors); // ["синий", "зеленый", "красный"]

// const numbers = [1, 2, 3, 4, 5, 6];

// const [one, two, thre, four, five, six] = numbers;

// const first = one
// const lastTwo = [five, six]
// const middle = [two, thre, four]

// console.log(first, lastTwo, middle)

// const handleValue = (evt) => {
//   console.log(evt.target.value)
// }

// profileNameInput.addEventListener('input', handleValue)

// const array = [0,1,2,3,4,5,6,7,8,9,10,11,20,40,50,1000]

// console.log(Math.max(...array))

// console.log(array.sort((a,b) => {
//   a - b
// }))

// function sumArray(array) {
//   if (!Array.isArray(array) || array.length <= 2) {
//     return 0;
//   }
//   const minNum = Math.min(...array);
//   const maxNum = Math.max(...array);
//   const res = array.reduce((acc, current) => acc + current, 0);
//   return res - minNum - maxNum;
// }

// console.log(sumArray([1, 2, 20, 0, 10]));


// function getMinMax(arr) {
//   let minValue = arr[0]
//   let maxValue = arr[0]

//   for (let i = 0; i < arr.length; i++) {
//     if (minValue > arr[i]) {
//       minValue = arr[i]
//     }
//   if (maxValue < arr[i]) {
//     maxValue = arr[i]
//   }
// }

//   return [minValue, maxValue];
// }

// console.log(getMinMax([1, 2]))



// console.log(litres(1))


// for (var i = 0; i < 10; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 1000)
// }

// for (let i = 0; i < 10; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 1000)
// }

// for (const i = 0; i < 10; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 1000)
// }

// function solution(str){
//   let res = ''
//   const stringLength = str.length //6 символов
//   for(let i = stringLength; i >= 0; i--) {
//     console.log(str[i])
   
//   }
//   return res
// }

// console.log(solution('Filipt'))
