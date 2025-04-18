// Create the widget if it doesn't exist
function createWidget() {
  const data = {
    companyName: "TechCorp",
    matchScore: 86,
    accountStatus: "Target"
  };

  const widget = document.createElement("div");
  widget.id = "linkedin-enhancer-widget";
  widget.innerHTML = `
    <div class="header">
      <strong>${data.companyName}</strong>
      <button id="toggle-widget">×</button>
    </div>
    <div class="match-score">
      <label>Match Score:</label>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${data.matchScore}%"></div>
      </div>
      <span class="score-text">${data.matchScore}%</span>
    </div>
    <div class="account-status ${data.accountStatus === "Target" ? "green" : "red"}">
      ${data.accountStatus}
    </div>
  `;

  document.body.appendChild(widget);

  // Toggle visibility on click
  document.getElementById("toggle-widget").onclick = () => {
    widget.style.display = "none";
    chrome.storage.sync.set({ widgetVisible: false });
  };
}

// Initialize widgetVisible in chrome.storage if not already set
chrome.storage.sync.get("widgetVisible", (result) => {
  if (result.widgetVisible === undefined) {
    // If widgetVisible is not set, set it to true by default
    chrome.storage.sync.set({ widgetVisible: true });
  }

  const isVisible = result.widgetVisible;

  // If widgetVisible is true or undefined (first time), show the widget
  if (isVisible) {
    if (!document.getElementById("linkedin-enhancer-widget")) {
      createWidget();
    }
  }
});

// Listen for messages to toggle widget visibility from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleWidget") {
    const widget = document.getElementById("linkedin-enhancer-widget");
    if (request.visible) {
      if (!widget) {
        createWidget(); // Create widget if it's not already there
      } else {
        widget.style.display = "block"; // Show widget
      }
    } else {
      if (widget) {
        widget.style.display = "none"; // Hide widget
      }
    }
  }
});
