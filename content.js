const gifUrls = [
  "gifs/sillyguy-seal.gif",
  "gifs/sillyguy-kfcbucket.gif",
  "gifs/sillyguy-diluc.gif",
  "gifs/sillyguy-cat.gif",
  "gifs/sillyguy-panda.gif",
  "gifs/sillyguy-shark.gif",
  "gifs/sillyguy-toast.gif",
  "gifs/sillyguy-uiia.gif"
];

// Function to create and display a GIF element
function createGifElement(url, top, left) {
  const gifElement = document.createElement('img');
  gifElement.src = url;
  gifElement.classList.add('persistent-gif');
  gifElement.style.position = 'fixed';
  gifElement.style.top = `${top}px`;
  gifElement.style.left = `${left}px`;
  gifElement.style.zIndex = '9999';
  document.body.appendChild(gifElement);
}

// Function to add a new random GIF
function addRandomGif() {
  const randomIndex = Math.floor(Math.random() * gifUrls.length);
  const randomTop = Math.random() * (window.innerHeight - 150);
  const randomLeft = Math.random() * (window.innerWidth - 100);
  const gifUrl = chrome.runtime.getURL(gifUrls[randomIndex]);

  // Send the new GIF to the background script
  chrome.runtime.sendMessage({
    action: 'addGif',
    url: gifUrl,
    top: randomTop,
    left: randomLeft,
  });

  // Display the new GIF
  createGifElement(gifUrl, randomTop, randomLeft);
}

// Load existing GIFs from storage and display them
chrome.storage.local.get('gifs', (data) => {
  const gifs = data.gifs || [];
  gifs.forEach((gif) => {
    createGifElement(gif.url, gif.top, gif.left);
  });
});

// Add a new random GIF when the page loads
addRandomGif();
