/* eslint linebreak-style: ["error", "windows"] */

export default function displayKeywords(allKeywords, firstTwo, nextKeywords) {
  if (allKeywords.length) {
    document.querySelectorAll('.saved__bold')[0].textContent = firstTwo;
    document.querySelectorAll('.saved__bold')[1].textContent = `${nextKeywords.length} другим`;
  } else {
    document.querySelector('.saved__keywords').textContent = 'У вас нету сохранённых новостей';
  }
}
