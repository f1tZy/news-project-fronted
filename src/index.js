/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import './index.css';
import './vendor/normalize.css';
import Popup from './js/components/Popup';
import Header from './js/components/Header';

const loginbtn = document.querySelector('.header-menu__auth');
const popup1 = document.querySelector('.popup');


popup = new Popup(popup1, [{
  event: 'mousedown',
  callback: (event) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
      popup.close();
    }
  },
}]);

header = new Header('.header', [{
  event: 'click',
  callback: (event) => {
    if (event.target.classList.contains('header-menu__button')) {
      popup.open();
    }
  },
}]);
