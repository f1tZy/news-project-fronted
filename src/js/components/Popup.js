/* eslint linebreak-style: ["error", "windows"] */
import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  open() {
    this._element.classList.add('.popup_is-opened');
  }
}
