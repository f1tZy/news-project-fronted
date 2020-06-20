/* eslint linebreak-style: ["error", "windows"] */
import BaseComponent from './BaseComponent';
// import customPopup from '../utils/customPopup';

export default class NewsCardList extends BaseComponent {
  constructor(selector, card, showMoreBtn, eventhandlers) {
    super(selector, eventhandlers);
    this._cardsContainer = this._element.querySelector('.results__cards-container');
    this.card = card;
    this._cards = [];
    this.lastIndex = 3;
    this.showMoreBtn = showMoreBtn;
  }

  renderPreloader(preloaderErr, preloader) {
    preloader.classList.remove('preloader_hide');
    preloaderErr.classList.add('preloader_hide');
    this.clearResults();
  }

  clearResults() {
    this._cardsContainer.innerHTML = '';
    this._cards = [];
  }

  renderSavedArticles(element) {
    element.forEach((e) => {
      this.addSaveCard(e);
    });
  }

  addSaveCard(data) {
    const saveCard = this.card.createSaveArticle(data);
    this._cardsContainer.appendChild(saveCard);
  }

  addCard(data) {
    const newCard = this.card.create(data);
    this._cardsContainer.appendChild(newCard);
  }

  getArticlesToRender() {
    const articlesToRender = this._cards.slice(this.lastIndex, this.lastIndex + 3);
    this.lastIndex += 3;
    if (articlesToRender.length < 3) {
      alert('Новости кончились. Поробуйте поискать что нибудь другое.'); // eslint-disable-line no-alert
      this.showMoreBtn.classList.add('results_hide');
    }
    return articlesToRender;
  }

  showMore() {
    const moreCards = this.getArticlesToRender();
    moreCards.forEach((e) => {
      this.addCard(e);
    });
  }

  firstThree() {
    const firstThree = this._cards.slice(0, this.lastIndex);
    firstThree.forEach((e) => {
      this.addCard(e);
    });
  }

  saveResults(results) {
    this._cards = results;
    this.firstThree();
  }
}
