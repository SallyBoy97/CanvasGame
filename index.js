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

const keys = [];
const hero = {
    x: 0, 
    y: 0,
    width: 30,
    height: 32,
    frameX: 0,
    frameY: 0,
    speed: 1,
    moving: false
};

//------dont delete below, experimenting with another method to animate the hero
// const heroWidth = 11; // Width of each frame in the sprite sheet
// const heroHeight = 32; // Height of each frame in the sprite sheet
// let heroFrameIndex = 0; // Current frame index for hero animation
// let heroX = canvas.width / 2; // Initial X position of hero
// let heroY = canvas.height - 100; // Initial Y position of hero
// const heroSpeed = 5; // Speed of hero movement

function spriteMovement(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function bringToLife() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    spriteMovement(heroImage, hero.width * hero.frameX, hero.height * hero.frameY, 
    hero.width, hero.height, hero.x, hero.y, hero.width, hero.height );
    moveHero();
    requestAnimationFrame(bringToLife);
}
bringToLife();




//maybe this movement will work better
window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
});

function moveHero() {
    if (keys[38] && hero.y > 100) { // Up arrow
        hero.y -= hero.speed;
        hero.frameY = 5;
    }
    if (keys[40] && hero.y < canvas.height - hero.height ) { // Down arrow
        hero.y += hero.speed;
        hero.frameY  = 3;

    }
    if (keys[37] && hero.x > 0) { // Left arrow
        hero.x -= hero.speed;
        hero.frameY = 4;
    }
    if (keys[39] && hero.x < canvas.width - hero.width) { // Right arrow
        hero.x += hero.speed;
        hero.frameY = 1;
    }
}

const monsters = []; // Array to store monster objects
let score = 0; // Score counter


// // Handle player movement
// function movePlayer(keyCode) {
//     if (keyCode === 37 && heroX > 0) { // Left arrow key
//         heroX -= heroSpeed;
//     } else if (keyCode === 39 && heroX < canvas.width - heroWidth) { // Right arrow key
//         heroX += heroSpeed;
//     } else if (keyCode === 38 && heroY > 0) { // Up arrow key
//         heroY -= heroSpeed;
//     } else if (keyCode === 40 && heroY < canvas.height - heroWidth) { // Down arrow key
//         heroY += heroSpeed;
//     }
// }

// // Check collision between hero and monsters
// function checkCollision() {
//     monsters.forEach(monster => {
//         if (
//             heroX < monster.x + monster.width &&
//             heroX + heroWidth > monster.x &&
//             heroY < monster.y + monster.height &&
//             heroY + heroWidth > monster.y
//         ) {
//             // Collision detected, reset game
//             resetGame();
//         }
//     });
// }

// // Reset the game
// function resetGame() {
//     score++; // Increment score
//     // Reset hero position
//     heroX = canvas.width / 2;
//     heroY = canvas.height - 100;
//     // Clear monsters array
//     monsters.length = 0;
// }

// // Function to draw player sprite
// function drawHero() {
//     ctx.drawImage(
//         heroImage,
//         heroFrameIndex * heroWidth, // Source X
//         0, // Source Y 
//         heroWidth, // Source width
//         heroHeight, // Source height
//         heroX, // Destination X
//         heroY, // Destination Y
//         heroWidth, // Destination width
//         heroHeight // Destination height
//     );
// }

// // Function to update player animation
// function updateHeroAnimation() {
//     heroFrameIndex = (heroFrameIndex + 1) % 4; 
// }

// Game loop function
// function gameLoop() {
//     // Clear canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//     // Draw background
//     ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
//     // Draw hero
//     drawHero();
    
//     // Draw monsters
//     monsters.forEach(monster => {
//         ctx.fillRect(monster.x, monster.y, monster.width, monster.height);
//     });
    
//     // Update player animation
//     updateHeroAnimation();
    
//     // Check collision
//     checkCollision();
    
//     // Generate monsters
//     generateMonsters();
    
//     // Render score
//     ctx.fillStyle = 'white';
//     ctx.font = '24px Arial';
//     ctx.fillText('Score: ' + score, 10, 30);
    
//     requestAnimationFrame(gameLoop);
// }

// // Generate monsters based on seconds
// setInterval(generateMonsters, 10000);

// // // Event listener for keyboard input
// // document.addEventListener('keydown', function(event) {
// //     movePlayer(event.keyCode);
// // });

// // Start the game loop
// gameLoop();
