/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import './index.css';
import './vendor/normalize.css';
import FormValidator from './js/FormValidator';

const loginForm = document.forms.login;// форма карточки
const inputLoginEmail = loginForm.elements.email;
const inputLoginPass = loginForm.elements.pass;
const loginBtn = document.querySelector('.popup__button');


const regForm = document.forms.reg;// форма пользователя
const inputRegMail = regForm.elements.email;// инпуты форм для валидатора
const inputRegPass = regForm.elements.pass;
// const inputNameReg = regForm.elements.name;
const regBtn = document.querySelector('.popup-reg__button');

const validator = new FormValidator();
const words = {
  validationLenght: 'Должно быть от 2 до 30 символов',
  strictly: 'Это обязательное поле',
  link: 'Здесь должна быть ссылка',
};

function setEventListeners() {
  loginForm.addEventListener('input', () => {
    validator.setSubmitButtonStateLogin(inputLoginEmail, inputLoginPass, loginBtn, words);
  });
  regForm.addEventListener('input', () => {
    validator.setSubmitButtonStateReg(inputRegMail, inputRegPass, regBtn, words);
  });
}
setEventListeners();
