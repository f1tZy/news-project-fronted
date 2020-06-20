/* eslint linebreak-style: ["error", "windows"] */

import BaseComponent from './BaseComponent';

export default class SearchForm extends BaseComponent {
  static elementValid(element) {
    return element.checkValidity();
  }
}
