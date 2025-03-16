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
        src: gifList[randomIndex]
    };
}

// Listen for new tab creation
chrome.tabs.onCreated.addListener((tab) => {
    console.log("✅ New tab opened! Tab ID:", tab.id);

    // Retrieve the current list of GIFs
    chrome.storage.local.get(["gifs"], (data) => {
        const gifList = data.gifs || [];
        const newGif = getRandomGif();

        // Add the new GIF to the list
        gifList.push(newGif);

        // Save the updated list back to storage
        chrome.storage.local.set({ gifs: gifList }, () => {
            console.log("✅ Stored new GIF:", newGif);
        });
    });
});