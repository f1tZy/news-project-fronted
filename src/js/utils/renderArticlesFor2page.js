/* eslint linebreak-style: ["error", "windows"] */

export default function renderSavedArticles(mainApi, cardList) {
  mainApi.getArticles()
    .then((articles) => {
      cardList.renderSavedArticles(articles.data);
    })
    .catch((err) => {
      console.log(err);
      alert('Что то пошло не так :('); // eslint-disable-line no-alert
    });
}
