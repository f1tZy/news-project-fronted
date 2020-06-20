/* eslint linebreak-style: ["error", "windows"] */

export default class MainApi {
  constructor(settings) {
    this._mainUrl = settings.mainUrl;
    this._headers = settings.headers;
  }

  signup(name, email, password) {
    return fetch(`${this._mainUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`{ Ошибка: ${res.status}, response: ${res.json()} }`));
      });
  }

  signin(email, password) {
    return fetch(`${this._mainUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  getUserData() {
    const headers = this._headers;
    headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return fetch(`${this._mainUrl}/users/me`, {
      method: 'GET',
      headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`{ Ошибка: ${res.status}, response: ${res.json()} }`));
      });
  }

  createArticle(title, text, source, link, image, date, keyword) {
    return fetch(`${this._mainUrl}/articles`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        title: `${title}`,
        text: `${text}`,
        source: `${source}`,
        link: `${link}`,
        image: `${image}`,
        date: `${date}`,
        keyword: `${keyword}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`{ Ошибка: ${res.status}, response: ${res.json()} }`));
      });
  }

  removeArticle(id) {
    return fetch(`${this._mainUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`{ Ошибка: ${res.status}, response: ${res.json()} }`));
      });
  }

  getArticles() {
    return fetch(`${this._mainUrl}/articles`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`{ Ошибка: ${res.status}, response: ${res.json()} }`));
      });
  }
}
