/* eslint linebreak-style: ["error", "windows"] */
export default class Card {
  constructor() {
    this._el = document.querySelector('.results__cards-container');
  }

  create(data) {
    const template = document.createElement('div');
    template.insertAdjacentHTML('afterBegin', `<div class="card">
    <div class="card__icon"></div>
    <p class="card__save">Войдите, чтобы сохранять статьи</p>
    <img class="card__img" alt="Изображение карточки">
    <div class="card__info">
        <p class="card__date"></p>
        <h2 class="card__title"></h2>
        <p class="card__text"></p>
        <a class="card__source" href=""></a>
        <span class="card__keyword"></span>
        <span class="card__id"></span>
    </div>
    </div>`);

    this._el = template.firstElementChild;
    this._el.querySelector('.card__title').textContent = data.title;
    this._el.querySelector('.card__text').textContent = data.text;
    this._el.querySelector('.card__source').textContent = data.source;
    this._el.querySelector('.card__source').href = data.link;
    this._el.querySelector('.card__img').src = data.image;
    this._el.querySelector('.card__keyword').textContent = data.keyword;

    const date = new Date(data.date);
    this._el.querySelector('.card__date').textContent = `${date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}, ${date.getFullYear()}`;

    return this._el;
  }

  createSaveArticle(data) {
    const template = document.createElement('div');
    template.insertAdjacentHTML('afterBegin', `<div class="card">
    <div class="card__delete"></div>
    <p class="card__category"></p>
    <p class="card__save">Убрать из сохраненых</p>
    <img class="card__img" src="" alt="Изображение карточки">
    <div class="card__info">
        <p class="card__date"></p>
        <h2 class="card__title"></h2>
        <p class="card__text"></p>
        <a class="card__source" href=""></a>
        <span class="card__id"></span>
    </div>
    </div>`);

    this._el = template.firstElementChild;
    this._el.querySelector('.card__title').textContent = data.title;
    this._el.querySelector('.card__text').textContent = data.text;
    this._el.querySelector('.card__source').textContent = data.source;
    this._el.querySelector('.card__source').href = data.link;
    this._el.querySelector('.card__id').textContent = data._id;
    this._el.querySelector('.card__category').textContent = data.keyword;
    this._el.querySelector('.card__img').src = data.image;
    this._el.querySelector('.card__date').textContent = data.date;

    return this._el;
  }
}
