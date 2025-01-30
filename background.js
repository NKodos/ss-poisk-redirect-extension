chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const kpPattern = /https:\/\/www\.kinopoisk\.ru\/(series|film)\/(\d+)/;
    const match = tab.url.match(kpPattern);

    if (match) {
      const type = match[1];
      const id = match[2];
      const redirectUrl = `https://www.sspoisk.ru/${type}/${id}`;

      chrome.storage.local.get("ssRedirectInfo", ({ ssRedirectInfo }) => {
        const newSsRedirectInfo = {
          url: redirectUrl,
          tabId,
        }

        if (!ssRedirectInfo || ssRedirectInfo.tabId !== tabId || ssRedirectInfo.url !== redirectUrl) {
          chrome.storage.local.set({ ssRedirectInfo: newSsRedirectInfo });
          chrome.action.openPopup();
        }
      });
    }
  }
});