console.log("✅ Content script loaded!");

// Inject all GIFs stored globally across the window
chrome.storage.local.get(["gifData"], function(result) {
    const storedGifs = result.gifData || [];

    storedGifs.forEach(gif => {
        let img = document.createElement("img");
        img.src = gif.src;
        img.style.position = "fixed";
        img.style.left = gif.left;
        img.style.top = gif.top;
        img.style.width = gif.width;
        img.style.zIndex = "9999";
        img.style.border = "3px solid black";
        img.style.borderRadius = "10px";
        document.body.appendChild(img);
    });
});