/* eslint linebreak-style: ["error", "windows"] */

export default function enableButton(button) {
  button.removeAttribute('disabled');
  button.classList.remove('popup__button_disabled');
  button.classList.add('popup__button_enable');
}
