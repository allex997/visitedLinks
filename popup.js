chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const currentUrl = tabs[0].url;

  chrome.storage.local.get('visitedPages', function (result) {
    const visitedPages = result.visitedPages || [];
    
    if (!visitedPages.includes(currentUrl)) {
      visitedPages.push(currentUrl);
      chrome.storage.local.set({ 'visitedPages': visitedPages });
    }

    updateVisitedPagesList(visitedPages, currentUrl);
  });
});

function updateVisitedPagesList(visitedPages, currentUrl) {
  const visitedPagesList = document.getElementById('visitedPagesList');
  visitedPagesList.innerHTML = '';  // Очистка списка перед обновлением

  const startIndex = Math.max(visitedPages.length - 5, 0);
  const endIndex = visitedPages.length;

  for (let i = startIndex; i < endIndex; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = visitedPages[i];

    // Проверяем, посещена ли страница, и добавляем соответствующий стиль
    if (visitedPages[i] === currentUrl) {
      listItem.classList.add('visited');
    }

    visitedPagesList.appendChild(listItem);
  }
}
