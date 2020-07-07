/* eslint linebreak-style: ["error", "windows"] */

export default class Card {
  constructor(mainApi) {
    this._el = document.querySelector('.results__cards-container');
    this.mainApi = mainApi;
    this.savedCards = [];
  }

  takeSavedCards() {
    if (localStorage.getItem('jwt')) {
      this.mainApi.getArticles()
        .then((articles) => {
          articles.data.forEach((element) => {
            this.savedCards.push(element);
          });
        });
    }
  }

  clearSavedCards() {
    this.savedCards = [];
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
    this._el.querySelector('.card__keyword').textContent = data.keyword;

    // проверяем если с сервера приходит инф-ция без картинки, вставляем картинку 'Изображение не найдено' с нашего сервера
    if (data.image === null) {
      this._el.querySelector('.card__img').src = 'https://www.news-project.gq/not_found.jpg';
    } else {
      this._el.querySelector('.card__img').src = data.image;
    }

    const date = new Date(data.date);
    this._el.querySelector('.card__date').textContent = `${date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}, ${date.getFullYear()}`;

    // перебираем массив с сохраненным карточками, если есть совпадения в ссылках, меняем иконку и добавляем id для возможности удаления(так пользователь не сможет добавить 2 одинаковые карточки)
    this.savedCards.forEach((e) => {
      if (this._el.querySelector('.card__source').href === e.link) {
        const cardIcon = this._el.querySelector('.card__icon');
        cardIcon.classList.remove('card__icon');
        cardIcon.classList.add('card__icon_save');
        this._el.querySelector('.card__id').textContent = e._id;
      }
    });

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
