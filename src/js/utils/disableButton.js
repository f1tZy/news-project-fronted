/* eslint linebreak-style: ["error", "windows"] */

export default function disableButton(button) {
  button.setAttribute('disabled', '');
  button.classList.remove('popup__button_enable');
  button.classList.add('popup__button_disabled');
}
