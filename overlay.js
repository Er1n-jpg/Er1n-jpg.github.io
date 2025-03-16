// overlay.js
const images = [
    "ad_aeki.jpg",
    "ad_hotkeyboards.jpg",
    "ad_singlemice.jpg",
    "ad_scuola.jpg"
  ];
  
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const imageUrl = chrome.runtime.getURL(randomImage);
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
 
  imgElement.style.zIndex = "10000";
  
  setTimeout(() => {
    window.close();
  }, 20000);

document.body.appendChild(imgElement);


console.log("Image displayed at:", imgElement.style.top, imgElement.style.left);