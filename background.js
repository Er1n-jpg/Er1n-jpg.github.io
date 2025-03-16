// background.js
function createOverlay() {
    // Get the screen dimensions from the current window
    chrome.windows.getCurrent((currentWindow) => {
      const screenWidth = currentWindow.width; // Width of the current window
      const screenHeight = currentWindow.height; // Height of the current window
  
      // Create a new overlay window
      chrome.windows.create(
        {
          url: "overlay.html",
          type: "popup",
          focused: true, // Don't focus the new window
          width: 200, // Width of the overlay
          height: 200, // Height of the overlay
          top: Math.floor(Math.random() * (screenHeight - 200)), // Random Y position
          left: Math.floor(Math.random() * (screenWidth - 200)), // Random X position
        },
        (newWindow) => {
          console.log("Overlay window created:", newWindow.id);
          overlayWindowId = newWindow.id; // Save the window ID
        bringWindowToFront(); // Start bringing the window to the front
        }
      );
    });
  }

  function bringWindowToFront() {
    if (overlayWindowId) {
      // Bring the window to the front every second
      setInterval(() => {
        chrome.windows.update(overlayWindowId, { focused: true });
      }, 1); // 1 second
    }
  }
  
  // Show the overlay every 5 seconds
  setInterval(() => {
    createOverlay();
  }, 10000); // 5 seconds