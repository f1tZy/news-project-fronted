/* eslint linebreak-style: ["error", "windows"] */

// блок форм и инпутов
const loginBtn = document.querySelector('.popup__button');
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
const cardsContainer = document.querySelector('.results__cards-container');

// блок кастомного попапа
const popupCustom = document.querySelector('.popup-succes');
const popupTitle = document.querySelector('.popup-succes__title');
const popupLink = document.querySelector('.popup-succes__link');

// блок header
const headerBlock = document.querySelector('.header');
const headerMenu = document.querySelector('.header-menu');

export {
  loginBtn,
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
  cardsContainer,
};
