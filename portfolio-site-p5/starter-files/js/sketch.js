let canvas;
let xPos = 0;
let yPos = 0;
let easing = 0.1;
let gifImage; 

function preload() {
    gifImage = loadImage("images/dog.gif");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", -2);
    canvas.style("position", "fixed");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    clear();

    // Update positions with scroll offset
    let targetX = mouseX + window.scrollX; 
    let targetY = mouseY + window.scrollY;

    // Smooth movement using easing
    xPos = xPos + (targetX - xPos) * easing;
    yPos = yPos + (targetY - yPos) * easing;

    drawThing(xPos, yPos);
}

function drawThing(_x, _y) {
    if (gifImage) {
        imageMode(CENTER); 
        image(gifImage, _x, _y, 250, 200); 
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }
  
