/* eslint linebreak-style: ["error", "windows"] */

export default class BaseComponent {
  constructor(selector, eventHandlers) {
    this._element = document.querySelector(selector);
    this._setHandlers(eventHandlers);
  }

  _setHandlers(eventHandlers) {
    if (Array.isArray(eventHandlers)) {
      eventHandlers.forEach((element) => {
        this._element.addEventListener(element.event, element.callback);
      });
    }
  }
}
