document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM fully loaded!");

    if (!document.getElementById("gif-overlay")) {
        const gifOverlay = document.createElement("div");
        gifOverlay.id = "gif-overlay";
        gifOverlay.style.position = "fixed";
        gifOverlay.style.top = "0";
        gifOverlay.style.left = "0";
        gifOverlay.style.width = "100vw";
        gifOverlay.style.height = "100vh";
        gifOverlay.style.pointerEvents = "none";
        gifOverlay.style.zIndex = "9999";
        document.body.appendChild(gifOverlay);
        console.log("✅ GIF overlay created!");
    }

    chrome.storage.local.get(["gifs"], (data) => {
        let gifList = data.gifs || [];
        gifList.forEach(addGifToScreen);
    });
});

// Function to display a GIF with random position & size
function addGifToScreen(gifData) {
    const gifOverlay = document.getElementById("gif-overlay");
    if (!gifOverlay) {
        console.error("🚨 GIF overlay not found!");
        return;
    }

    const img = document.createElement("img");
    img.src = chrome.runtime.getURL(gifData.src);

    // Calculate random position & size inside `content.js`
    const maxWidth = window.innerWidth - 200;
    const maxHeight = window.innerHeight - 200;
    img.style.position = "absolute";
    img.style.left = `${Math.random() * maxWidth}px`;
    img.style.top = `${Math.random() * maxHeight}px`;
    img.style.width = `${Math.random() * 100 + 100}px`;
    img.style.zIndex = "9999";

    gifOverlay.appendChild(img);
    console.log("✅ Added GIF:", img.src);
}
