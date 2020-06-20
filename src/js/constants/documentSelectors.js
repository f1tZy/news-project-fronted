/* eslint linebreak-style: ["error", "windows"] */

// блок форм и инпутов
const loginForm = document.forms.login;// форма карточки
const inputLoginEmail = document.forms.login.elements.email;
const inputLoginPass = document.forms.login.elements.pass;
const loginBtn = document.querySelector('.popup__button');


const regForm = document.forms.reg;// форма пользователя
const inputRegMail = document.forms.reg.elements.emailReg;// инпуты форм для валидатора
const inputRegPass = document.forms.reg.elements.passReg;
const inputNameReg = document.forms.reg.elements.username;
const regBtn = document.querySelector('.popup-reg__button');

// блок поиска
const searchBtn = document.querySelector('.search__button');
const searchErr = document.querySelector('.error-search');
const searchInput = document.querySelector('.search__input');

// блок результатов
const preloaderErr = document.querySelector('.preloader__err');
const preloaderLoading = document.querySelector('.preloader__loading');
const preloaderTitle = document.querySelector('.preloader__title');
const preloaderSubtitle = document.querySelector('.preloader__subtitle');
const results = document.querySelector('.results');
const showMoreBtn = document.querySelector('.results__show-more');

// блок кастомного попапа
const popupCustom = document.querySelector('.popup-succes');
const popupTitle = document.querySelector('.popup-succes__title');
const popupLink = document.querySelector('.popup-succes__link');

// блок header
const headerBlock = document.querySelector('.header');
const headerMenu = document.querySelector('.header-menu');

export {
  loginForm,
  inputLoginEmail,
  inputLoginPass,
  loginBtn,
  regForm,
  inputRegMail,
  inputRegPass,
  inputNameReg,
  regBtn,
  searchErr,
  searchBtn,
  searchInput,
  preloaderErr,
  preloaderLoading,
  preloaderTitle,
  preloaderSubtitle,
  results,
  popupCustom,
  popupTitle,
  popupLink,
  showMoreBtn,
  headerMenu,
  headerBlock,
};
