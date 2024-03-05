// Load images
const backgroundImage = new Image();
backgroundImage.src = 'images/background.png';

const heroImage = new Image();
heroImage.src = 'images/hero.png';

// Define game variables
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

const heroWidth = 128; // Width of each frame in the sprite sheet
const heroHeight = 384; // Height of each frame in the sprite sheet
let heroFrameIndex = 0; // Current frame index for hero animation
let heroX = canvas.width / 2; // Initial X position of hero
let heroY = canvas.height - 100; // Initial Y position of hero
const heroSpeed = 5; // Speed of hero movement
const monsters = []; // Array to store monster objects
let score = 0; // Score counter

// Generate monsters randomly
function generateMonsters() {
    // Generate monsters based on probability
    if (Math.random() < 0.1) { // Adjust probability as needed
        const monster = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: 32, // Adjust according to monster size
            height: 32, // Adjust according to monster size
        };
        monsters.push(monster);
    }
}

// Handle player movement
function movePlayer(keyCode) {
    // Example: move player based on arrow keys
    if (keyCode === 37 && heroX > 0) { // Left arrow key
        heroX -= heroSpeed;
    } else if (keyCode === 39 && heroX < canvas.width - heroWidth) { // Right arrow key
        heroX += heroSpeed;
    } else if (keyCode === 38 && heroY > 0) { // Up arrow key
        heroY -= heroSpeed;
    } else if (keyCode === 40 && heroY < canvas.height - heroWidth) { // Down arrow key
        heroY += heroSpeed;
    }
}

// Check collision between hero and monsters
function checkCollision() {
    // Example: loop through monsters and check for collision with hero
    monsters.forEach(monster => {
        if (
            heroX < monster.x + monster.width &&
            heroX + heroWidth > monster.x &&
            heroY < monster.y + monster.height &&
            heroY + heroWidth > monster.y
        ) {
            // Collision detected, reset game
            resetGame();
        }
    });
}

// Reset the game
function resetGame() {
    score++; // Increment score
    // Reset hero position
    heroX = canvas.width / 2;
    heroY = canvas.height - 100;
    // Clear monsters array
    monsters.length = 0;
}

// Function to draw player sprite
function drawHero() {
    ctx.drawImage(
        heroImage,
        heroFrameIndex * heroWidth, // Source X
        0, // Source Y (assuming all frames are on the same row)
        heroWidth, // Source width
        heroHeight, // Source height
        heroX, // Destination X
        heroY, // Destination Y
        heroWidth, // Destination width
        heroHeight // Destination height
    );
}

// Function to update player animation
function updateHeroAnimation() {
    // Update the hero frame index here based on player movement or other game logic
    // Example: increment frame index for next frame in animation
    heroFrameIndex = (heroFrameIndex + 1) % 4; // Assuming there are 4 frames in the sprite sheet
}

// Game loop function
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    // Draw hero
    drawHero();
    
    // Draw monsters
    monsters.forEach(monster => {
        ctx.fillRect(monster.x, monster.y, monster.width, monster.height);
    });
    
    // Update player animation
    updateHeroAnimation();
    
    // Check collision
    checkCollision();
    
    // Generate monsters
    generateMonsters();
    
    // Render score
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    
    requestAnimationFrame(gameLoop);
}

// Generate monsters every second
setInterval(generateMonsters, 1000);

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    movePlayer(event.keyCode);
});

// Start the game loop
gameLoop();
