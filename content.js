console.log("✅ Content script loaded!");

// Listen for message from background script with GIF data
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "injectGifs") {
        // For each GIF, generate a random position
        request.gifs.forEach(gif => {
            const img = document.createElement("img");
            img.src = gif.src;

            // Get random position for the GIF
            const maxWidth = window.innerWidth - 200; // Avoid overflow
            const maxHeight = window.innerHeight - 200;
            img.style.position = "fixed";
            img.style.left = `${Math.random() * maxWidth}px`;
            img.style.top = `${Math.random() * maxHeight}px`;
            img.style.width = `${Math.random() * 100 + 100}px`; // Random size between 100px and 200px
            img.style.zIndex = "9999";
            img.style.border = "3px solid black";
            img.style.borderRadius = "10px";

            document.body.appendChild(img); // Add GIF to the page
            console.log("✅ Injected GIF:", gif.src);
        });
    }
});
