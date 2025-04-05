console.log('Hello from the background script!')

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openOptionsPage") {
      console.log("Opening options page...");
      chrome.runtime.openOptionsPage();
    }
  });
  