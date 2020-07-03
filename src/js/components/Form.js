/* eslint linebreak-style: ["error", "windows"] */

import BaseComponent from './BaseComponent';

export default class NewFormValidator extends BaseComponent {
  constructor(selector, enableButton, disableButton, eventhandlers) {
    super(selector, eventhandlers);
    this.enableButton = enableButton;
    this.disableButton = disableButton;
  }

  static elementValid(element) {
    return element.checkValidity();
  }

  static clearContent(form) {
    form.reset();
  }

  _validateInputElement(element, words) {
    this.error = document.querySelector(`.error-${element.name}`);
    if (!element.validity.valid) {
      if (element.validity.typeMismatch) {
        this.error.textContent = words.email;
      }
      if (element.value.length < Number(element.getAttribute('minlength'))) {
        if (element.validity.valueMissing) {
          this.error.textContent = words.strictly;
        } this.error.textContent = `Введите более ${element.getAttribute('minlength')} символов`;
      }
      return false;
    }
    this.error.textContent = '';
    return true;
  }

  validateForm(inputs, message, button) {
    const checkInput = Array.from(inputs);
    let isValid = true;
    checkInput.forEach((input) => {
      this._validateInputElement(input, message);
      if (!input.validity.valid) {
        isValid = false;
      }
    });
    if (isValid) {
      this.enableButton(button);
    } else {
      this.disableButton(button);
    }
  }
}
