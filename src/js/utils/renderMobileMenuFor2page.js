/* eslint linebreak-style: ["error", "windows"] */

export default function openMobileMenu() {
  document.querySelector('.header-menu').classList.toggle('header-menu_mobile');
  document.querySelector('.header_black').classList.toggle('root_black');
  document.querySelector('.header-menu').style.backgroundColor = '#f5f6f7';
  document.querySelector('.header_black').style.backgroundColor = '#f5f6f7';
  document.querySelector('.header-menu').style.borderTop = '1px solid #1a1b22';
}
