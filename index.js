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
        this.score = 0; 
        this.scoreElement = document.createElement('div'); 
        document.body.appendChild(this.scoreElement);
        this.monsters = []; 
        this.monsterImage = new Image();
        this.numMonsters = 8;
        this.animate = this.animate.bind(this);

    }

    updateScore() {
        this.scoreElement.innerText = `Score: ${this.score}`; 
    }

    init() {
        this.backgroundImage.src = 'images/background.png';
        this.heroImage.src = 'images/hero.png';
        this.monsterImage.src = 'images/Monster.png'; 
        this.hero.image = this.heroImage;
        window.addEventListener("keydown", (e) => this.keys[e.keyCode] = true);
        
        window.addEventListener("keyup", (e) => delete this.keys[e.keyCode]);

        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);

        
        // Generate initial monster
        for (let i = 0; i < this.numMonsters; i++) {
            this.generateMonster();
        }        
        this.animate();
    }

    generateMonster() {
        const monster = new Monster();
        monster.image = this.monsterImage;
        monster.x = Math.random() * (this.canvas.width - monster.width);
        monster.y = Math.random() * (this.canvas.height - monster.height);
        this.monsters.push(monster);
    }

    resetGame() {
        // Reset player position
        this.hero.resetPosition();

        // Clear monsters array
        this.monsters = [];

        // Generate new monsters
        for (let i = 0; i < this.numMonsters; i++) {
            this.generateMonster();
        }

        // Reset score
        this.score = 0;
        this.updateScore();
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

               // Draw and update monsters
            this.monsters.forEach(monster => {
                monster.draw(this.ctx);
                // // If the player has scored, reset monster position
                // if (this.hero.x >= this.canvas.width - this.hero.width) {
                //     monster.x = this.canvas.width + Math.random() * 100; // Randomize spawn position
                //     monster.y = Math.random() * (this.canvas.height - monster.height);
                // }
                monster.move();
            });

              // Collision detection between hero and monsters
              this.monsters.forEach((monster, index) => {

                const heroHitbox = {
                    x: this.hero.x + this.hero.width / 20,
                    y: this.hero.y + this.hero.height / 1,
                    width: this.hero.width / 20,
                    height: this.hero.height * 4 / 10
                };

                if (
                    heroHitbox.x < monster.x + monster.width &&
                    heroHitbox.x + heroHitbox.width > monster.x &&
                    heroHitbox.y < monster.y + monster.height &&
                    heroHitbox.y + heroHitbox.height > monster.y
                ) {
                    // Reset player position
                    this.hero.resetPosition();
                    // Remove collided monster
                    this.monsters.splice(index, 1);
                    // Generate new monster
                    this.generateMonster();
                    // Reset game
                    this.resetGame();

                }
            });

             // Check if hero reaches the right side of the canvas
             if (this.hero.x >= this.canvas.width - this.hero.width) {
                this.score++; // Increment score
                this.updateScore(); // Update the displayed score
                if (this.score >= 1) {
                    this.hero.resetPosition(); // Reset hero's position to start
                    // Reset monster positions
                    this.monsters.forEach(monster => {
                        monster.x = Math.random() * (this.canvas.width - monster.width);
                        monster.y = Math.random() * (this.canvas.height - monster.height);
                    });
                }
            }
             // Generate monsters moving from right to left
        if (Math.random() < 0.05) { // Adjustable rate 
            this.generateMonster();
        }
        }
    }
}

class Hero {
    constructor() {
        this.x = 0;
        this.y = 500;
        this.width = 30;
        this.height = 32;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.moving = false;
        this.image = new Image();
    }

    resetPosition() {
        this.x = 0;
        this.y = 500;
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
        if (keys[38] && this.y > 0) { // Up arrow
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

class Monster {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 90;
        this.height =80;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 3; // You can adjust the monster's speed
        this.image = new Image();
    }

    draw(ctx) {
        const scale = .75;
        ctx.drawImage(this.image, 
                this.width * this.frameX, this.height * this.frameY, 
                this.width, this.height, 
                this.x, this.y, 
                this.width * scale, this.height * scale);
    }

    move() {
        this.x += (Math.random() - 1.5) * this.speed;
        this.y += (Math.random() - 0.5) * this.speed;
    }
}

const game = new Game();
game.init();

