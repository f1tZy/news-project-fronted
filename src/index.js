/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-unused-vars */
/* eslint no-use-before-define: ["error", { "variables": false }] */

import './index.css';
import './vendor/normalize.css';
import Popup from './js/components/Popup';
import MainApi from './js/api/MainApi';
import { MainApiUrl, NewApiKey, NewsApiUrl } from './js/constants/settings';
import Header from './js/components/Header';
import checkUser from './js/utils/checkUser';
import Card from './js/components/Card';
import checkAuth from './js/utils/checkAuth';
import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewCardList';
import {
  searchErr, searchBtn, searchInput, preloaderErr, preloaderLoading, preloaderTitle, preloaderSubtitle, results, showMoreBtn, headerBlock,
  headerMenu, loginBtn, regBtn, cardsContainer,
} from './js/constants/documentSelectors';
import customPopup from './js/utils/customPopup';
import takeData from './js/utils/takeDataFromCard';
import popupsCloseOnEsc from './js/utils/closeOnEsc';
import disableButton from './js/utils/disableButton';
import enableButton from './js/utils/enableButton';
import NewFormsValidator from './js/components/Form';

const messages = {
  strictly: 'Это обязательное поле',
  email: 'e-mail в формате: students-yandex@yandex.ru',
};

// запрос на news.api
const newsApi = new NewsApi({
  baseUrl: NewsApiUrl,
  key: NewApiKey,
  headers: {},
});

// запрос на сервер c бд
const mainApi = new MainApi({
  mainUrl: MainApiUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// для отрисовки карточки
const card = new Card(mainApi);

// валидация логина
const validatePopupLogin = new NewFormsValidator('.popup__form', enableButton, disableButton, [
  {
    event: 'input',
    callback: (e) => {
      if (e.target.classList.contains('popup__input')) {
        const inputs = e.target.parentNode.getElementsByTagName('input');
        validatePopupLogin.validateForm(inputs, messages, loginBtn);
      }
    },
  },
]);

// валидация регистрации
const validatePopupReg = new NewFormsValidator('.popup-reg__form', enableButton, disableButton, [
  {
    event: 'input',
    callback: (e) => {
      if (e.target.classList.contains('popup-reg__input')) {
        const inputs = e.target.parentNode.getElementsByTagName('input');
        validatePopupReg.validateForm(inputs, messages, regBtn);
      }
    },
  },
]);

// работа с формой поиска
const searchForm = new NewFormsValidator('.search__form', enableButton, disableButton, [
  {
    event: 'submit',
    callback: (e) => {
      e.preventDefault();
      const keyword = searchInput.value;
      cardList.clearResults();
      cardList.renderPreloader(preloaderErr, preloaderLoading);
      results.classList.add('results_hide');
      showMoreBtn.classList.remove('results_hide');
      card.clearSavedCards();
      card.takeSavedCards();
      newsApi.getNews(keyword)
        .then((data) => {
          const cards = data.articles.map((item) => (
            {
              keyword,
              title: item.title,
              text: item.description,
              date: item.publishedAt,
              source: item.source.name,
              link: item.url,
              image: item.urlToImage,
            }));
          if (cards.length) {
            cardList.saveResults(cards);
            results.classList.remove('results_hide');
            preloaderErr.classList.add('preloader_hide');
            preloaderLoading.classList.add('preloader_hide');
          } else {
            results.classList.add('results_hide');
            preloaderErr.classList.remove('preloader_hide');
            preloaderLoading.classList.add('preloader_hide');
          }
        })
        .catch((err) => {
          console.log(err);
          preloaderLoading.classList.add('preloader_hide');
          preloaderErr.classList.remove('preloader_hide');
          preloaderTitle.textContent = 'Ошибка на сервере';
          preloaderSubtitle.textContent = 'Произошла ошибка при получении данных';
        });
    },
  },
  {
    event: 'input',
    callback: (e) => {
      if (NewFormsValidator.elementValid(e.target)) {
        searchBtn.removeAttribute('disabled');
        searchErr.style.display = 'none';
      } else {
        searchBtn.setAttribute('disabled', '');
        searchErr.style.display = 'flex';
      }
    },
  },
  {
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('search__button')) {
        if (NewFormsValidator.elementValid(searchInput)) {
          searchBtn.removeAttribute('disabled');
          searchErr.style.display = 'none';
        } else {
          searchBtn.setAttribute('disabled', '');
          searchErr.style.display = 'flex';
        }
      }
    },
  },
]);

// работа со списком карточек
const cardList = new NewsCardList('.results', card, showMoreBtn, [
  {
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('results__show-more')) {
        cardList.showMore();
      }
    },
  },
  {
    event: 'click',
    callback: (e) => {
      const targetCard = e.target.parentNode;
      if (e.target.classList.contains('card__icon')) {
        if (localStorage.getItem('jwt')) {
          const dataCard = takeData(targetCard);
          mainApi.createArticle(dataCard.title, dataCard.text, dataCard.source, dataCard.link, dataCard.image, dataCard.date, dataCard.keyword)
            .then((data) => {
              const id = data.data._id;
              targetCard.querySelector('.card__id').textContent = id;
              e.target.classList.remove('card__icon');
              e.target.classList.add('card__icon_save');
            })
            .catch((err) => {
              console.log(err);
              customPopup('Не удалось сохранить карточку.');
            });
        }
      } else if (e.target.classList.contains('card__icon_save')) {
        const id = targetCard.querySelector('.card__id').textContent;
        mainApi.removeArticle(id)
          .then(() => {
            e.target.classList.remove('card__icon_save');
            e.target.classList.add('card__icon');
          })
          .catch((err) => {
            console.log(err);
            customPopup('Не удалось удалить карточку из сохраненных.');
          });
      }
    },
  },
]);

// работа с header'ом
const header = new Header('.header', [
  {
    // открываем попап логина
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('header-menu__button') || e.target.parentNode.classList.contains('header-menu__button')) {
        if (!localStorage.getItem('jwt')) {
          popupLogin.open(e);
          NewFormsValidator.clearContent(document.forms.login);
          disableButton(loginBtn);
        } else {
          localStorage.removeItem('jwt');
          checkUser(header, mainApi);
          window.location.reload();
        }
      }
    },
  },
  {
    // открытие/закрытие мобильного меню
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('header-mobile')) {
        headerMenu.classList.toggle('header-menu_mobile');
        headerBlock.classList.toggle('root_black');
      }
    },
  }]);

// попап регистрации
const popupReg = new Popup('.popup-reg', [
  {
    // закрытие и смена попапа регистрации
    event: 'mousedown',
    callback: (e) => {
      if (e.target.classList.contains('popup-reg') || e.target.classList.contains('popup-reg__close')) {
        popupReg.close(e);
      }
      if (e.target.classList.contains('popup-reg__link')) {
        popupReg.close(e);
        popupLogin.open(e);
        NewFormsValidator.clearContent(document.forms.login);
        NewFormsValidator.clearContent(document.forms.reg);
      }
    },
  },
  {
    // отправляем данные на сервер для регистрации
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('popup-reg__button')) {
        e.preventDefault();
        // посылаем инфу с формы
        mainApi.signup(document.forms.reg.elements.username.value, document.forms.reg.elements.emailReg.value, document.forms.reg.elements.passReg.value)
          .then(() => {
            popupReg.close();
            popupSucces.open();
          })
          .catch((err) => {
            if (err === 409) {
              customPopup('Такой пользователь уже существует!');
            } else {
              customPopup('Ошибка сервера :(');
            }
          });
      }
    },
  }]);

// попап логина
const popupLogin = new Popup('.popup', [
  {
    // закрытие и смена попапа логина
    event: 'mousedown',
    callback: (e) => {
      if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
        popupLogin.close(e);
      }
      if (e.target.classList.contains('popup__link')) {
        popupReg.open(e);
        popupLogin.close(e);
        NewFormsValidator.clearContent(document.forms.login);
      }
    },
  },
  {
    // отправляем данные на сервер для входа
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('popup__button')) {
        e.preventDefault();
        // посылаем инфу с формы
        mainApi.signin(document.forms.login.elements.email.value, document.forms.login.elements.pass.value)
          .then((data) => {
            localStorage.setItem('jwt', data.jwt);
            popupLogin.close();
            while (cardsContainer.firstChild) {
              cardsContainer.removeChild(cardsContainer.firstChild);
              results.classList.add('results_hide');
              NewFormsValidator.clearContent(document.forms.searchForm);
            }
            customPopup('Вы успешно авторизовались :)');
            checkUser(header, mainApi);
          })
          .catch((err) => {
            if (err === 401) {
              customPopup('Не верный логин или пароль');
            } else {
              customPopup('Ошибка сервера :(');
            }
          });
      }
    },
  }]);

// попап успешной регистрации
const popupSucces = new Popup('.popup-succes', [{
  event: 'mousedown',
  callback: (e) => {
    if (e.target.classList.contains('popup-succes') || e.target.classList.contains('popup-succes__close')) {
      popupSucces.close(e);
    }
    if (e.target.classList.contains('popup-succes__link')) {
      popupLogin.open(e);
      popupSucces.close(e);
      NewFormsValidator.clearContent(document.forms.login);
    }
  },
}]);

// кастомный попап
const popupCustom = new Popup('.popup-custom', [{
  event: 'mousedown',
  callback: (e) => {
    if (e.target.classList.contains('popup-custom') || e.target.classList.contains('popup-custom__close')) {
      popupCustom.close(e);
    }
  },
}]);

// проверяем при загрузке залогинен ли пользователь
checkUser(header, mainApi);

// убираем уведомление что требуется регистрация
checkAuth();

// закрытие попапов на ESC
popupsCloseOnEsc(popupLogin, popupReg, popupSucces, popupCustom);
