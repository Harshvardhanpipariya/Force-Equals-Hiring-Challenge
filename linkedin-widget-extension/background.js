chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ widgetVisible: true });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleWidget") {
      chrome.storage.sync.set({ widgetVisible: request.visible });
    }
  });
  

 
    console.log("Widget visibility set to true");

    chrome.storage.sync.get(["widgetVisible"], (data) => {
      console.log("Current widget visibility:", data.widgetVisible);
    });
