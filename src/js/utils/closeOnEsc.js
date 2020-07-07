/* eslint linebreak-style: ["error", "windows"] */

export default function popupsCloseOnEsc(popupLogin, popupReg, popupSucces, popupCustom) {
  document.addEventListener('keydown', (e) => {
    if (document.querySelector('.popup-custom').classList.contains('popup_is-opened')) {
      if (e.key === 'Escape') {
        popupCustom.close();
      }
      return;
    }
    if (document.querySelector('.popup').classList.contains('popup_is-opened')) {
      if (e.key === 'Escape') {
        popupLogin.close();
      }
      return;
    }
    if (document.querySelector('.popup-reg').classList.contains('popup_is-opened')) {
      if (e.key === 'Escape') {
        popupReg.close();
      }
      return;
    }
    if (document.querySelector('.popup-succes').classList.contains('popup_is-opened')) {
      if (e.key === 'Escape') {
        popupSucces.close();
      }
    }
  });
}
