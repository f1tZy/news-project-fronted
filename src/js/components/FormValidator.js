/* eslint linebreak-style: ["error", "windows"] */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["disableButton", "enableButton"] }] */


export default class FormValidator {
  // валидатор
  checkInputValidity(element, words) {
    this.error = document.querySelector(`.error-${element.name}`);// общяя переменная для ошибки всех инпутов, при введении инф-ы
    if (!element.validity.valid) {
      if (element.validity.typeMismatch) { this.error.textContent = words.email; }
      if (element.value.length < Number(element.getAttribute('minlength'))) {
        if (element.validity.valueMissing) {
          this.error.textContent = words.strictly;
        } else { this.error.textContent = `Введите более ${element.getAttribute('minlength')} символов`; }
        return false;
      }
      return false;
    }
    this.error.textContent = '';
    return true;
  }

  // кнопка попапа ПОЛЬЗОВАТЕЛЯ(проверяем проходит ли валидацию и меняем состояние кнопки, передаем инпуты формы, кнопку которая меняет состояние, массив ошибок)
  setSubmitButtonStateReg(inputRegEMail, inputRegPass, inputNameReg, regBtn, words) {
    const userRegEmail = this.checkInputValidity(inputRegEMail, words);
    const userRegPass = this.checkInputValidity(inputRegPass, words);
    const userRegName = this.checkInputValidity(inputNameReg, words);
    if (userRegEmail && userRegPass && userRegName) { this.enableButton(regBtn); } else { this.disableButton(regBtn); }
  }

  // кнопка попапа КАРТОЧКИ(проверяем проходит ли валидацию и меняем состояние кнопки, передаем инпуты формы, кнопку которая меняет состояние, массив ошибок)
  setSubmitButtonStateLogin(inputLoginEmail, inputLoginPass, loginBtn, words) {
    const userLoginEmail = this.checkInputValidity(inputLoginEmail, words);
    const userLoginPass = this.checkInputValidity(inputLoginPass, words);
    if (userLoginEmail && userLoginPass) { this.enableButton(loginBtn); } else { this.disableButton(loginBtn); }
  }

  disableButton(button) {
    button.setAttribute('disabled', '');
    button.classList.remove('popup__button_enable');
    button.classList.add('popup__button_disabled');
  }

  enableButton(button) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled');
    button.classList.add('popup__button_enable');
  }
}
