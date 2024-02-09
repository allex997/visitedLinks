// Функция обработки логики для ссылки при клике
function processLinkClick(linkUrl, visitedPages) {
  if (visitedPages.includes(linkUrl)) {
    // Если ссылка уже посещена, добавляем стили
    const links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      if (links[i].href === linkUrl) {
        links[i].classList.add('visited-link');
        links[i].style.color = 'green';
      }
    }
    // Откладываем обновление текущей страницы на момент после применения стилей
    setTimeout(() => {
      location.reload();
    }, 0);
  }
}

// Обработчик события для клика на ссылке
document.addEventListener('click', function (event) {
  // Проверяем, что клик был на ссылке
  if (event.target.tagName === 'A') {
    const linkUrl = event.target.href;

    // Получаем данные из хранилища Chrome
    chrome.storage.local.get('visitedPages', function (result) {
      const visitedPages = result.visitedPages || [];

      // Если ссылка еще не посещена, добавляем ее в хранилище
      if (!visitedPages.includes(linkUrl)) {
        visitedPages.push(linkUrl);
        chrome.storage.local.set({ 'visitedPages': visitedPages });
      }

      // Выполняем логику для обработки клика на ссылке
      processLinkClick(linkUrl, visitedPages);
    });
  }
});

// Выполняем вашу логику при загрузке страницы
window.onload = function () {
  const currentUrl = window.location.href;

  // Получаем данные из хранилища Chrome
  chrome.storage.local.get('visitedPages', function (result) {
    const visitedPages = result.visitedPages || [];

    // Если текущая страница не посещена, добавляем ее в хранилище
    if (!visitedPages.includes(currentUrl)) {
