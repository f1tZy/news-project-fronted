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
import setEventListeners from './js/utils/setEventListeners';
import Card from './js/components/Card';
import checkAuth from './js/utils/checkAuth';
import NewsApi from './js/api/NewsApi';
import NewsCardList from './js/components/NewCardList';
import SearchForm from './js/components/SearchForm';
import {
  searchErr, searchBtn, searchInput, preloaderErr, preloaderLoading, preloaderTitle, preloaderSubtitle, results, showMoreBtn, headerBlock,
  headerMenu,
} from './js/constants/documentSelectors';
import customPopup from './js/utils/customPopup';
import takeData from './js/utils/takeDataFromCard';

// запрос на news.api
const newsApi = new NewsApi({
  baseUrl: NewsApiUrl,
  key: NewApiKey,
  headers: {},
});
const card = new Card();

// работа с формой поиска
const searchForm = new SearchForm('.search__form', [
  {
    event: 'submit',
    callback: (e) => {
      e.preventDefault();
      const keyword = searchInput.value;
      cardList.clearResults();
      cardList.renderPreloader(preloaderErr, preloaderLoading);
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
      if (SearchForm.elementValid(e.target)) {
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
        if (SearchForm.elementValid(searchInput)) {
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

// запрос на сервер c бд
const mainApi = new MainApi({
  mainUrl: MainApiUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// работа с header'ом
const header = new Header('.header', [
  {
    // открываем попап логина
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('header-menu__button') || e.target.parentNode.classList.contains('header-menu__button')) {
        if (!localStorage.getItem('jwt')) {
          popupLogin.open(e);
          Popup.clearContent(document.forms.login);
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
        Popup.clearContent(document.forms.login);
        Popup.clearContent(document.forms.reg);
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
            console.log(err);
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
        Popup.clearContent(document.forms.login);
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
      Popup.clearContent(document.forms.login);
    }
  },
}]);

// проверяем при загрузке залогинен ли пользователь
checkUser(header, mainApi);

// вызываем функцию слушателей для валидации полей
setEventListeners();

// убираем уведомление что требуется регистрация
checkAuth();
