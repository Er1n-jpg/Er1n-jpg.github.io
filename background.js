let gifList = [
    "gifs/sillyguy-seal.gif",
    "gifs/sillyguy-kfcbucket.gif",
    "gifs/sillyguy-diluc.gif",
    "gifs/sillyguy-cat.gif",
    "gifs/sillyguy-panda.gif",
    "gifs/sillyguy-seal.gif",
    "gifs/sillyguy-shark.gif",
    "gifs/sillyguy-toast.gif",
    "gifs/sillyguy-uiia.gif"
];


// Store GIFs globally across tabs
let gifData = [];

// When a new tab is created, add a random GIF
chrome.tabs.onCreated.addListener(() => {
    const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
    gifData.push({
        src: chrome.runtime.getURL(randomGif),
    });
});

// When tab is updated (completed loading), inject GIFs into the page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        // Ensure we inject the GIFs after tab has finished loading
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: injectPersistentGifs
        });
    }
});

// Function to inject the stored GIFs into the page
function injectPersistentGifs() {
    // Send the stored GIF data to the content script
    chrome.runtime.sendMessage({
        action: "injectGifs",
        gifs: gifData
    });
}

// Save GIF data to persistent storage
function saveGifData() {
    chrome.storage.local.set({ gifData });
}

// Periodically save GIF data
setInterval(saveGifData, 5000);