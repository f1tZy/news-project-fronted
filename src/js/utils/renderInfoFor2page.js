/* eslint linebreak-style: ["error", "windows"] */
import displayKeywords from './displayKeywords';

export default function renderInfo(mainApi) {
  mainApi.getUserData()
    .then((data) => {
      const { name } = data.data;
      return mainApi.getArticles()
        .then((articles) => {
          document.querySelector('.saved__info').textContent = `${name}, у вас ${articles.data.length} сохранённых статей`;

          // тут нереальная сортировка keywords :)
          const allKeywords = [];
          articles.data.forEach((e) => {
            allKeywords.push(e.keyword);
          });
          const keywords = allKeywords.filter((item, pos) => allKeywords.indexOf(item) === pos);
          const firstTwo = keywords.slice(0, 2);
          const nextKeywords = keywords.slice(2, keywords.length);

          displayKeywords(allKeywords, firstTwo, nextKeywords);
        })
        .catch((err) => {
          console.log(err);
          alert('Что то пошло не так :('); // eslint-disable-line no-alert
        });
    });
}
