console.log("✅ Content script loaded!");

// Wait for the document to be ready
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM fully loaded!");

    // Check if the overlay already exists
    if (!document.getElementById("gif-overlay")) {
        const gifOverlay = document.createElement("div");
        gifOverlay.id = "gif-overlay";
        gifOverlay.style.position = "fixed";
        gifOverlay.style.top = "0";
        gifOverlay.style.left = "0";
        gifOverlay.style.width = "100vw";
        gifOverlay.style.height = "100vh";
        gifOverlay.style.pointerEvents = "none";
        gifOverlay.style.zIndex = "999999";
        document.body.appendChild(gifOverlay);

        console.log("✅ GIF overlay created!");

        // Load stored GIFs and display them
        chrome.storage.local.get(["gifs"], (data) => {
            let gifList = data.gifs || [];
            gifList.forEach(addGifToScreen);
        });
    }
});

// Function to display a GIF on screen
function addGifToScreen(gifData) {
    const gifOverlay = document.getElementById("gif-overlay");
    if (!gifOverlay) {
        console.error("🚨 GIF overlay not found!");
        return;
    }

    const img = document.createElement("img");
    img.src = chrome.runtime.getURL(gifData.src);
    img.style.position = "absolute";
    img.style.left = `${gifData.left}px`;
    img.style.top = `${gifData.top}px`;
    img.style.width = `${gifData.size}px`;
    img.style.zIndex = "9999";

    gifOverlay.appendChild(img);
    console.log("✅ Added GIF:", img.src);
}
