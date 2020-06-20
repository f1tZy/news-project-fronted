/* eslint linebreak-style: ["error", "windows"] */

import BaseCompanent from './BaseComponent';

export default class Header extends BaseCompanent {
  render({ userName }) {
    const authButton = this._element.querySelector('.header-menu__auth');
    const saveArticles = this._element.querySelector('.header-menu__saved');
    const outIcon = this._element.querySelector('.header-menu__unauth');

    if (userName) {
      authButton.textContent = userName;
      saveArticles.classList.remove('header-menu_hide');
      outIcon.classList.remove('header-menu_hide');
    } else {
      authButton.textContent = 'Авторизоваться';
      saveArticles.classList.add('header-menu_hide');
      outIcon.classList.add('header-menu_hide');
    }
  }
}
