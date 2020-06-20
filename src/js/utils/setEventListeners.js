/* eslint linebreak-style: ["error", "windows"] */
import FormValidator from '../components/FormValidator';
import {
  loginForm,
  inputLoginEmail,
  inputLoginPass,
  loginBtn,
  regForm,
  inputRegMail,
  inputRegPass,
  inputNameReg,
  regBtn,
} from '../constants/documentSelectors';

const validator = new FormValidator();
const words = {
  strictly: 'Это обязательное поле',
  email: 'e-mail в формате: students-yandex@yandex.ru',
};

export default function setEventListeners() {
  loginForm.addEventListener('input', () => {
    validator.setSubmitButtonStateLogin(inputLoginEmail, inputLoginPass, loginBtn, words);
  });
  regForm.addEventListener('input', () => {
    validator.setSubmitButtonStateReg(inputRegMail, inputRegPass, inputNameReg, regBtn, words);
  });
}
