console.log("Script loaded!");
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

function injectImage() {
    console.log("Injecting image...")
    const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
    let img = document.createElement('img');
    img.src = chrome.runtime.getURL(randomGif); // Get correct extension path
    img.alt = "Random GIF";
    img.id = "customImageOverlay";
    const maxWidth = window.innerWidth - 200; // Prevent overflow
    const maxHeight = window.innerHeight - 200;
    img.style.position = "fixed";
    img.style.left = `${Math.random() * maxWidth}px`;
    img.style.top = `${Math.random() * maxHeight}px`;
    
    // Set size & z-index
    img.style.width = "150px";
    img.style.zIndex = "9999";
    img.style.border = "3px solid black";
    img.style.borderRadius = "10px";

    document.body.appendChild(img); // Add GIF to page
    console.log("✅ Injected GIF:", randomGif);
}

if (document.body) {
    injectImage();
} else {
    document.addEventListener("DOMContentLoaded", injectImage);
}