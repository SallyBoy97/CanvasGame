class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        document.body.appendChild(this.canvas);
        this.keys = [];
        this.hero = new Hero();
        this.backgroundImage = new Image();
        this.heroImage = new Image();
        this.fps = 10;
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
        this.now;
        this.elapsed;
    }

    init() {
        this.backgroundImage.src = 'images/background.png';
        this.heroImage.src = 'images/hero.png';
        this.hero.image = this.heroImage;
        window.addEventListener("keydown", (e) => this.keys[e.keyCode] = true);
        
        window.addEventListener("keyup", (e) => delete this.keys[e.keyCode]);
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.now = Date.now();
        this.elapsed = this.now - this.then;
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - (this.elapsed % this.fpsInterval);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
            this.hero.draw(this.ctx);
            this.hero.move(this.keys, this.canvas);
        }
    }
}

class Hero {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 30;
        this.height = 32;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.moving = false;
        this.image = new Image();
    }

    draw(ctx) {
        const scale = 2;
        ctx.drawImage(this.image, 
                this.width * this.frameX, this.height * this.frameY, 
                this.width, this.height, 
                this.x, this.y, 
                this.width * scale, this.height * scale);
    }

    move(keys, canvas) {
        if (keys[38] && this.y > 100) { // Up arrow
            this.y -= this.speed;
            this.frameY = 5;
        }
        if (keys[40] && this.y < canvas.height - this.height) { // Down arrow
            this.y += this.speed;
            this.frameY = 3;
        }
        if (keys[37] && this.x > 0) { // Left arrow
            this.x -= this.speed;
            this.frameY = 1;
        }
        if (keys[39] && this.x < canvas.width - this.width) { // Right arrow
            this.x += this.speed;
            this.frameY = 4;
        }
        this.moving = keys[38] || keys[40] || keys[37] || keys[39];
        this.animate();
    }

    animate() {
        if (this.frameX < 3 && this.moving) this.frameX++;
        else this.frameX = 0;
    }
}

const game = new Game();
game.init();

// const monsters = []; // Array to store monster objects
// let score = 0; // Score counter

//------dont delete below, experimenting with another method to animate the hero
// const heroWidth = 11; // Width of each frame in the sprite sheet
// const heroHeight = 32; // Height of each frame in the sprite sheet
// let heroFrameIndex = 0; // Current frame index for hero animation
// let heroX = canvas.width / 2; // Initial X position of hero
// let heroY = canvas.height - 100; // Initial Y position of hero
// const heroSpeed = 5; // Speed of hero movement

//----!!!!IMPORTANT DO NOT DELETE bringToLife function!!!!----

// function bringToLife() {
//     ctx.clearRect(0,0,canvas.width, canvas.height);
//     ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
//     spriteMovement(heroImage, hero.width * hero.frameX, hero.height * hero.frameY, 
//     hero.width, hero.height, hero.x, hero.y, hero.width, hero.height );
//     moveHero();
//     heroFrames();
//     requestAnimationFrame(bringToLife);
// }
// bringToLife();


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
