/* eslint linebreak-style: ["error", "windows"] */

export default class NewsApi {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._key = settings.key;
    this._headers = settings.headers;
  }

  getNews(keyword) {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 7);
    return fetch(`${this._baseUrl}/everything?q=${keyword}&apiKey=${this._key}&from=${from.getFullYear()}-${from.getMonth() + 1}-${from.getDate()}&to=${to.getFullYear()}-${to.getMonth() + 1}-${to.getDate()}&pageSize=100`, {
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
