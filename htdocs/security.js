// security.js

// Disable right-click context menu on the entire page
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

// Disable image dragging to prevent direct downloading
const images = document.querySelectorAll("img");
images.forEach(img => img.setAttribute("draggable", "false"));

// Optionally, disable specific keyboard shortcuts like Ctrl+S, Ctrl+U
document.addEventListener("keydown", function(e) {
    if ((e.ctrlKey && (e.key === 's' || e.key === 'u' || e.key === 'p')) || e.key === 'F12') {
        e.preventDefault();
    }
});