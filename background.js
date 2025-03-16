// List of available GIFs
const gifList = [
    "gifs/sillyguy-seal.gif",
    "gifs/sillyguy-kfcbucket.gif",
    "gifs/sillyguy-diluc.gif",
    "gifs/sillyguy-cat.gif",
    "gifs/sillyguy-panda.gif",
    "gifs/sillyguy-shark.gif",
    "gifs/sillyguy-toast.gif",
    "gifs/sillyguy-uiia.gif"
];

// Function to get a random GIF
function getRandomGif() {
    const randomIndex = Math.floor(Math.random() * gifList.length);
    return {
        src = gifList[randomIndex]
    };
}

// Listen for new tab creation
chrome.tabs.onCreated.addListener((tab) => {
    console.log("✅ New tab opened! Tab ID:", tab.id);

    // Generate a unique key for the new GIF
    const gifKey = `gif_${Date.now()}`;
    const newGif = getRandomGif();

    // Save the new GIF to storage
    chrome.storage.local.set({ [gifKey]: newGif }, () => {
        console.log("✅ Stored new GIF:", newGif);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^https?:/.test(tab.url)) {
        const gifKey = `gif_${Date.now()}`;
            const newGif = getRandomGif();

            // Save the new GIF to storage
        chrome.storage.local.set({ [gifKey]: newGif }, () => {
            console.log("✅ Stored new GIF:", newGif);
        });
    }
});
