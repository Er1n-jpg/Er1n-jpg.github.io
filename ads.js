document.addEventListener('DOMContentLoaded', function () {
    // Get the container element
    const container = document.getElementById('image-container');

    // Create an image element
    const img = document.createElement('img');
    img.src = 'image.png'; // Path to your image
    img.alt = 'Dynamic Image'; // Alt text for accessibility

    // Append the image to the container
    container.appendChild(img);
});