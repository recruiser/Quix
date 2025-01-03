// Select the main window container
const mainContainer = document.querySelector('.window');
const containers = document.querySelectorAll('.project-container');
console.log('Number of containers found:', containers.length); // Should show 11

// Variables to store initial positions
let isDragging = false;
let startX, startY, initialX, initialY;

// Function to set initial random positions for containers
function setInitialPositions() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    console.log('Setting positions...'); // Debug log
    
    const positions = [
        { top: viewportHeight * 0.1, left: viewportWidth * 0.2 },     // top left - container1
        { top: viewportHeight * 0.1, left: viewportWidth * 0.6 },     // top right - container2
        { top: viewportHeight * 0.65, left: viewportWidth * 0.65 },   // bottom right - container3
        { top: viewportHeight * 0.65, left: viewportWidth * 0.15 },   // bottom left - container4
        { top: viewportHeight * 0.35, left: viewportWidth * 0.8 },    // middle right - container5
        { top: viewportHeight * 0.35, left: viewportWidth * 0.1 },    // middle left - container6
        { top: viewportHeight * 0.8, left: viewportWidth * 0.80 },     // bottom center - container7
        { top: viewportHeight * 0.05, left: viewportWidth * 0.4 },    // top center - container8
        { top: viewportHeight * 0.45, left: viewportWidth * 0.75 },   // right - container9
        { top: viewportHeight * 0.45, left: viewportWidth * 0.2 },    // left - container10
    ];

    // Force immediate positioning
    containers.forEach((container, index) => {
        if (container) {
            // Override any existing positioning with !important
            container.style.setProperty('position', 'fixed', 'important');
            container.style.setProperty('left', positions[index].left + 'px', 'important');
            container.style.setProperty('top', positions[index].top + 'px', 'important');
            container.style.setProperty('z-index', '6', 'important');
            container.style.setProperty('visibility', 'visible', 'important');
            container.style.transform = 'none';
        }
    });
}
// Ensure positioning happens after any other scripts
window.addEventListener('load', () => {
    setTimeout(setInitialPositions, 100); // Small delay to ensure it runs after other scripts
});
window.addEventListener('resize', setInitialPositions);

// Function for small, random movements for all containers except hovered
function randomSmallMovement(exclude) {
    containers.forEach(container => {
        if (container !== exclude) {
            const randomX = (Math.random() - 0.5) * 15; // Smaller movement range
            const randomY = (Math.random() - 0.5) * 15;
            
            // Special handling for container11 to prevent overlap
            if (container.id === 'container11') {
                const currentTop = parseInt(container.style.top);
                const currentLeft = parseInt(container.style.left);
                container.style.transform = `translate(${randomX}px, ${randomY}px)`;
                
                // Check if movement would cause overlap
                const rect = container.getBoundingClientRect();
                const overlaps = Array.from(containers).some((other, index) => {
                    if (other !== container && index !== 10) { // Skip self and original container11 position
                        const otherRect = other.getBoundingClientRect();
                        return !(rect.right < otherRect.left || 
                               rect.left > otherRect.right || 
                               rect.bottom < otherRect.top || 
                               rect.top > otherRect.bottom);
                    }
                    return false;
                });
                
                // If overlap detected, reset position
                if (overlaps) {
                    container.style.transform = 'none';
                }
            } else {
                container.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
        }
    });
}

// Add event listener for each container to trigger movement on others and handle click
containers.forEach((container, index) => {
    container.addEventListener('mouseenter', () => randomSmallMovement(container));
    container.addEventListener('mouseleave', () => {
        // Reset position on mouse leave
        containers.forEach(container => container.style.transform = 'translate(0, 0)');
    });
    container.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
            e.preventDefault();
            window.open(`project${index + 1}.html`, '_blank');
        }
    });
});
// Unified startDrag function for both touch and mouse events
function startDrag(event) {
    isDragging = true;

    const isTouch = event.type.includes('touch');
    startX = isTouch ? event.touches[0].clientX : event.clientX;
    startY = isTouch ? event.touches[0].clientY : event.clientY;

    initialX = mainContainer.offsetLeft;
    initialY = mainContainer.offsetTop;

    // Prevent default actions to ensure only dragging occurs
    if (isTouch) event.preventDefault();
}

// Unified drag function
function drag(event) {
    if (!isDragging) return;

    const isTouch = event.type.includes('touch');
    const currentX = isTouch ? event.touches[0].clientX : event.clientX;
    const currentY = isTouch ? event.touches[0].clientY : event.clientY;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    // Apply new position
    mainContainer.style.left = `${initialX + deltaX}px`;
    mainContainer.style.top = `${initialY + deltaY}px`;

    // Adjust the positions of floating containers while dragging
    adjustFloatingContainers();
}

// Stop dragging function
function stopDrag() {
    isDragging = false;
}

function adjustFloatingContainers() {
    const mainRect = mainWindow.getBoundingClientRect();

    containers.forEach(container => {
        const containerRect = container.getBoundingClientRect();
        
        if (isOverlapping(mainRect, containerRect)) {
            // Calculate the direction to move
            const centerX = mainRect.left + mainRect.width / 2;
            const centerY = mainRect.top + mainRect.height / 2;
            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;

            const moveX = containerCenterX < centerX ? -150 : 150;
            const moveY = containerCenterY < centerY ? -150 : 150;

            container.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

function isOverlapping(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}
// Event listeners for mouse and touch
mainContainer.addEventListener('mousedown', startDrag);
mainContainer.addEventListener('mousemove', drag);
mainContainer.addEventListener('mouseup', stopDrag);
mainContainer.addEventListener('mouseleave', stopDrag);

// Touch event listeners
mainContainer.addEventListener('touchstart', startDrag, { passive: false });
mainContainer.addEventListener('touchmove', drag, { passive: false });
mainContainer.addEventListener('touchend', stopDrag);
mainContainer.addEventListener('touchcancel', stopDrag);

// Preload images function
function preloadImages() {
    const imageUrls = ['38.jpg']; // Add all project5 images here
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload when page loads
document.addEventListener('DOMContentLoaded', preloadImages);

