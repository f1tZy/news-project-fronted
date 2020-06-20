/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-unused-vars */
/* eslint no-use-before-define: ["error", { "variables": false }] */

import './index.css';
import '../vendor/normalize.css';
import MainApi from '../js/api/MainApi';
import { MainApiUrl } from '../js/constants/settings';
import Header from '../js/components/Header';
import NewsCardList from '../js/components/NewCardList';
import Card from '../js/components/Card';
import checkUser from '../js/utils/checkUser';
import openMobileMenu from '../js/utils/renderMobileMenuFor2page';
import renderInfo from '../js/utils/renderInfoFor2page';
import renderSavedArticles from '../js/utils/renderArticlesFor2page';

const mainApi = new MainApi({
  mainUrl: MainApiUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});


const header = new Header('.header_black', [
  {
    // открываем попап логина
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('header-menu__button') || e.target.parentNode.classList.contains('header-menu__button')) {
        localStorage.removeItem('jwt');
        checkUser(header, mainApi);
        window.location.href = '../';
      }
    },
  },
  {
    // открытие/закрытие мобильного меню
    event: 'click',
    callback: (e) => {
      if (e.target.classList.contains('header-mobileblack')) {
        openMobileMenu();
      }
    },
  }]);

const card = new Card();

const cardList = new NewsCardList('.results', card, null, [
  {
    event: 'click',
    callback: (e) => {
      const targetCard = e.target.parentNode;
      if (e.target.classList.contains('card__delete')) {
        const id = targetCard.querySelector('.card__id').textContent;
        mainApi.removeArticle(id)
          .then(() => {
            targetCard.parentNode.removeChild(e.target.closest('.card'));
            renderInfo(mainApi, cardList);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
]);

// отрисововаем инфу пользователя
renderInfo(mainApi);

// рендерим карточки
renderSavedArticles(mainApi, cardList);

// проверяем имеет ли доступ пользователь к странице
function checkAccess() {
  if (localStorage.getItem('jwt')) {
    checkUser(header, mainApi);
  } else {
    alert('Сначала авторизуйтесь!'); // eslint-disable-line no-alert
    window.location.href = '../';
  }
}
checkAccess();
