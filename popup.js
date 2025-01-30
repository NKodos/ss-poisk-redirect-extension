document.addEventListener("DOMContentLoaded", async () => {

  chrome.storage.local.get("ssRedirectInfo", ({ ssRedirectInfo }) => {
    if (ssRedirectInfo) {
      document.body.innerHTML =
        `<p>Перейти на сайт <a href="${ssRedirectInfo.url}">sspoisk</a>?</p>
      <button id="redirect">Перейти</button>`;

      const redirectButton = document.getElementById("redirect");
      redirectButton.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.update(tabs[0].id, { url: ssRedirectInfo.url });
        });
      });
    } else {

    }
  });
});
