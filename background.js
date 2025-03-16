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

// Store GIFs and their random positions globally (for the entire window)
let gifData = [];

function generateRandomGifData() {
    const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
    const maxWidth = window.innerWidth - 200; // Avoid overflow
    const maxHeight = window.innerHeight - 200;

    const gif = {
        src: chrome.runtime.getURL(randomGif),
        left: Math.random() * maxWidth + "px",
        top: Math.random() * maxHeight + "px",
        width: `${Math.random() * 100 + 100}px` // Random width between 100px and 200px
    };

    return gif;
}

// On window creation (new tab)
chrome.tabs.onCreated.addListener((tab) => {
    // Store GIF data across all tabs in the window
    const newGif = generateRandomGifData();
    gifData.push(newGif);
});

// On tab update (reload or new tab opened)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: injectPersistentGifs
        });
    }
});

// Function to inject all stored GIFs into the page
function injectPersistentGifs() {
    chrome.storage.local.get(["gifData"], function(result) {
        const storedGifs = result.gifData || [];

        storedGifs.forEach(gif => {
            let img = document.createElement("img");
            img.src = gif.src;
            img.style.position = "fixed";
            img.style.left = gif.left;
            img.style.top = gif.top;
            img.style.width = gif.width;
            img.style.zIndex = "9999";
            img.style.border = "3px solid black";
            img.style.borderRadius = "10px";
            document.body.appendChild(img);
        });
    });
}

// Save GIF data to persistent storage
function saveGifData() {
    chrome.storage.local.set({ gifData });
}

// Periodically save GIF data
setInterval(saveGifData, 5000);
