chrome.tabs.onCreated.addListener(() => {
    // Send message to content script to add a new GIF
    chrome.storage.local.get(["gifs"], (data) => {
        let gifList = data.gifs || [];
        let newGif = getRandomGif();

        // Store new GIF in local storage
        gifList.push(newGif);
        chrome.storage.local.set({ gifs: gifList });
    });
});

// Function to get a random GIF
function getRandomGif() {
    const gifList = [
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
    return {
        src: gifList[Math.floor(Math.random() * gifList.length)],
        left: Math.random() * (window.innerWidth - 200),
        top: Math.random() * (window.innerHeight - 200),
        size: Math.random() * 100 + 100
    };
}
