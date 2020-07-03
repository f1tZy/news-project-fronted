/* eslint linebreak-style: ["error", "windows"] */

import { popupCustom, popupTitle } from '../constants/documentSelectors';

export default function customPopup(message) {
  popupCustom.classList.add('popup_is-opened');
  popupTitle.textContent = message;
}
