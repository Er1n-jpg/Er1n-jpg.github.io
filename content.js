console.log("✅ content.js is running!");

// Function to display a GIF with random position & size
function addGifToScreen(gifSrc) {
    console.log("🔄 Attempting to add GIF:", gifSrc);

    const gifOverlay = document.getElementById("gif-overlay");
    if (!gifOverlay) {
        console.error("🚨 GIF overlay not found!");
        return;
    }

    const img = document.createElement("img");
    console.log("🖼️ Created img element:", img);

    // Hardcode a valid GIF URL for testing
    const testUrl = chrome.runtime.getURL("gifs/sillyguy-seal.gif");
    console.log("🖼️ Hardcoded GIF URL:", testUrl);

    img.src = testUrl; // Use the hardcoded URL
    console.log("🖼️ GIF src after setting:", img.src);

    // Calculate random position & size
    const maxWidth = window.innerWidth - 200;
    const maxHeight = window.innerHeight - 200;
    img.style.position = "absolute";
    img.style.left = `${Math.random() * maxWidth}px`;
    img.style.top = `${Math.random() * maxHeight}px`;
    img.style.width = `${Math.random() * 100 + 100}px`;
    img.style.zIndex = "9999";

    gifOverlay.appendChild(img);
    console.log("✅ Added GIF to screen:", img.src);
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

// Retrieve all GIFs from storage and display them
chrome.storage.local.get(null, (data) => {
    console.log("📦 Retrieved data from storage:", data);

    if (!data || Object.keys(data).length === 0) {
        console.warn("⚠️ No GIFs found in storage.");
        return;
    }

    for (const key in data) {
        if (key.startsWith("gif_")) {
            console.log("🔍 Found GIF in storage:", data[key]);
            addGifToScreen(data[key]);
        }
    }
});