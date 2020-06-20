/* eslint linebreak-style: ["error", "windows"] */

import { popupCustom, popupTitle, popupLink } from '../constants/documentSelectors';

export default function customPopup(message) {
  popupCustom.classList.add('popup_is-opened');
  popupTitle.textContent = message;
  popupTitle.style.textAlign = 'center';
  popupTitle.style.marginTop = '35px';
  popupLink.style.display = 'none';
}
