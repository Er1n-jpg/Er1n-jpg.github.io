// Store GIFs and their positions in chrome.storage
let gifs = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ gifs: [] }); // Initialize empty GIF list
});

// Listen for new GIFs from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'addGif') {
    chrome.storage.local.get('gifs', (data) => {
      gifs = data.gifs || [];
      gifs.push({ url: request.url, top: request.top, left: request.left });
      chrome.storage.local.set({ gifs }); // Update stored GIFs
    });
  }
});