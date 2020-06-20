/* eslint linebreak-style: ["error", "windows"] */

export default function popupsCloseOnEsc(popupLogin, popupReg, popupSucces) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popupLogin.close(e);
      popupReg.close(e);
      popupSucces.close(e);
    }
  });
}
