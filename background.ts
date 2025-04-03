console.log('Hello from the background script! test')
// get the linked visible post content on the window

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//       if (changeInfo.status === 'complete' && tab.url.includes('linkedin.com/feed')) {
//         chrome.scripting.executeScript({
//           target: { tabId },
//           files: ['content.js']
//         });
//       }
//     });
//   });