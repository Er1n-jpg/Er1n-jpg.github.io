console.log("✅ content.js is running!");

// Function to display a GIF with random position & size
function addGifToScreen(gifData) {
    const gifOverlay = document.getElementById("gif-overlay");
    if (!gifOverlay) {
        console.error("🚨 GIF overlay not found!");
        return;
    }

    const img = document.createElement("img");
    img.src = chrome.runtime.getURL(gifData.src);

    // Calculate random position & size
    const maxWidth = window.innerWidth - 200; // Ensure the GIF stays within the screen
    const maxHeight = window.innerHeight - 200;
    img.style.position = "absolute";
    img.style.left = `${Math.random() * maxWidth}px`;
    img.style.top = `${Math.random() * maxHeight}px`;
    img.style.width = `${Math.random() * 100 + 100}px`; // Random size between 100px and 200px
    img.style.zIndex = "9999";

    gifOverlay.appendChild(img);
    console.log("✅ Added GIF:", img.src);
}

// Create the GIF overlay if it doesn't exist
if (!document.getElementById("gif-overlay")) {
    const gifOverlay = document.createElement("div");
    gifOverlay.id = "gif-overlay";
    gifOverlay.style.position = "fixed";
    gifOverlay.style.top = "0";
    gifOverlay.style.left = "0";
    gifOverlay.style.width = "100vw";
    gifOverlay.style.height = "100vh";
    gifOverlay.style.pointerEvents = "none"; // Ensure the overlay doesn't block clicks
    gifOverlay.style.zIndex = "999999";
    document.body.appendChild(gifOverlay);
    console.log("✅ GIF overlay created!");
}

// Retrieve GIFs from storage and display them
chrome.storage.local.get(["gifs"], (data) => {
    const gifList = data.gifs || [];
    console.log("✅ Retrieved GIFs from storage:", gifList);
    gifList.forEach(addGifToScreen);
});