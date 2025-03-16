console.log("✅ Content script loaded!");

// Prevent multiple overlays from being created
if (document.getElementById("gif-overlay")) {
    console.log("🚨 GIF overlay already exists, skipping...");
} else {
    // Create a persistent overlay for GIFs
    const gifOverlay = document.createElement("div");
    gifOverlay.id = "gif-overlay";
    gifOverlay.style.position = "fixed";
    gifOverlay.style.top = "0";
    gifOverlay.style.left = "0";
    gifOverlay.style.width = "100vw";
    gifOverlay.style.height = "100vh";
    gifOverlay.style.pointerEvents = "none"; // Prevents interference with page clicks
    gifOverlay.style.zIndex = "999999";
    document.body.appendChild(gifOverlay);

    console.log("✅ GIF overlay created!");

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

    function addRandomGif() {
        const img = document.createElement("img");
        img.src = chrome.runtime.getURL(gifList[Math.floor(Math.random() * gifList.length)]);

        // Random size and position
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

    // Add a new GIF every time a new tab is opened
    addRandomGif();
}
