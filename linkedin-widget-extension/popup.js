document.getElementById("toggle-btn").addEventListener("click", () => {
  chrome.storage.sync.get("widgetVisible", (result) => {
    const updated = !result.widgetVisible;
    chrome.storage.sync.set({ widgetVisible: updated }, () => {
      console.log("Widget visibility updated to:", updated);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "toggleWidget", visible: updated },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
              }
            }
          );
        }
      });
    });
  });
});
