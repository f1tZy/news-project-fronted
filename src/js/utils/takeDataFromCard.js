/* eslint linebreak-style: ["error", "windows"] */
export default function takeData(element) {
  const data = [];
  data.title = element.querySelector('.card__title').textContent;
  data.text = element.querySelector('.card__text').textContent;
  data.source = element.querySelector('.card__source').textContent;
  data.link = element.querySelector('.card__source').href;
  data.image = element.querySelector('.card__img').src;
  data.date = element.querySelector('.card__date').textContent;
  data.keyword = element.querySelector('.card__keyword').textContent;

  return data;
}
