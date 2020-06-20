/* eslint linebreak-style: ["error", "windows"] */

export default function checkAuth() {
  document.addEventListener('mousemove', () => {
    if (localStorage.getItem('jwt')) {
      document.querySelectorAll('.card__save').forEach((item) => {
        const icon = item;
        icon.style.display = 'none';
      });
    }
  });
}
