console.log("Script loaded!");
function injectImage() {
    console.log("Injecting image...")
    let img = document.createElement('img');
    img.src = chrome.runtime.getURL('uh.png');
    img.alt = "Overlay Image";
    img.id = "customImageOverlay";
    img.style.position = 'fixed';
    img.style.top = '10px';
    img.style.left = '10px';
    img.style.width = '150px';
    img.style.zIndex = 9999;
    img.style.border - "3px solid black";
    img.style.borderRadius = "10px";
    document.body.appendChild(img);
    console.log("Image injected!")
}

if (document.body) {
    injectImage();
} else {
    document.addEventListener("DOMContentLoaded", injectImage);
}