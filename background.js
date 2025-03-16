// Function to get a random GIF
function getRandomGif() {
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

    return {
        src: gifList[Math.floor(Math.random() * gifList.length)]
    };
}

chrome.tabs.onCreated.addListener(() => {
    console.log("✅ New tab opened!");

    chrome.storage.local.get(["gifs"], (data) => {
        let gifList = data.gifs || [];
        let newGif = getRandomGif();

        gifList.push(newGif);
        chrome.storage.local.set({ gifs: gifList }, () => {
            console.log("✅ Stored new GIF:", newGif);
        });
    });
});

