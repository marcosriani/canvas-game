const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 400);

// Select buttons on the home page
const radioButtonLevel1 = document.getElementById('level1');
const radioButtonLevel2 = document.getElementById('level2');
const radioButtonLevel3 = document.getElementById('level3');

let gameFrame = 0;
let gameStarted = false;
let gameOver = false;
let win = false;
let score = 0;
let gameLevel = radioButtonLevel1.value;

radioButtonLevel1.addEventListener('click', () => {
  gameLevel = radioButtonLevel1.value;
});
radioButtonLevel2.addEventListener('click', () => {
  gameLevel = radioButtonLevel2.value;
});
radioButtonLevel3.addEventListener('click', () => {
  gameLevel = radioButtonLevel3.value;
});

// Controls for the game level
if (radioButtonLevel1.checked) {
  console.log('Level1');
} else if (radioButtonLevel2.checked) {
  console.log('Level2');
} else if (radioButtonLevel3.checked) {
  console.log('Level3');
}

// Score controls
const scoreParagraph = document.querySelector('.score__paragraph');
const scoreSpan = document.querySelector('.score__span');

// Images
const cloudImage1 = document.querySelector('#cloud1');
const cloudImage2 = document.querySelector('#cloud2');
const ground = document.querySelector('#ground');
const ground2 = document.querySelector('#ground2');
const enemy1 = document.querySelector('#enemy1');
const enemy2 = document.querySelector('#enemy2');

class FlyingImages {
  constructor(cloudImg, maxW, maxH, minW, minH) {
    this.w = Math.floor(Math.random() * (maxW - minW + 1) + minW);
    this.h = Math.floor(Math.random() * (maxH - minH + 1) + minH);
    this.speed = Math.floor(Math.random() * (3 - 2 + 1) + 2);
    this.x = 600;
    this.y = Math.floor(Math.random() * (300 - 0 + 1) + 0);
    this.cloudImg = cloudImg;
  }

  draw() {
    ctx.drawImage(this.cloudImg, this.x, this.y, this.w, this.h);
  }

  update() {
    this.x -= this.speed;
  }
}

const arrayFlyingItems = [];

const flyingImageHandler = (images, imageQuantity) => {
  // Make sure random images are displayed starting at index 0
  if (gameFrame % 100 === 0) {
    const image = Math.floor(Math.random() * (imageQuantity - 0 + 1)) + 0;
    arrayFlyingItems.push(new FlyingImages(images[image], 100, 90, 50, 45));
  }

  arrayFlyingItems.forEach((cloudItem) => {
    cloudItem.draw();
    cloudItem.update();
  });

  //   Check if the cloud has past the canvas border and removes it
  arrayFlyingItems.forEach((cloudItem, index) => {
    if (cloudItem.x < -cloudItem.w) {
      arrayFlyingItems.splice(index, 1);
    }
  });
};

// BACKGROUND LAYER
let gameSpeed = 1;
const backgroundLayer1 = new Image();
backgroundLayer1.src = '../img/mid_ground_cloud_2.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '../img/ground.png';

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  update() {
    if (this.x <= -this.width) {
      this.x = 0;
    }

    this.x = this.x - this.speed;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

const layer1 = new Layer(backgroundLayer1, 0.5);

class Ground {
  constructor() {
    this.x = 0;
    this.y = 300;
    this.speedX = 100;
    this.speedY = 100;
    this.w = 200;
    this.h = 100;
  }

  draw() {
    ctx.drawImage(ground, this.x, this.y, this.w, this.h);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speedX;
    }
  }

  moveRight() {
    if (this.x < CANVAS_WIDTH - this.w) {
      this.x += this.speedX;
    }
  }

  detectCollision = (player) => {
    if (
      player.y + player.radius === this.y + this.h &&
      player.x + player.radius <= this.x + this.w
    ) {
      //   console.log('true');
      return true;
    } else {
      return false;
    }
  };

  update() {
    this.x;
  }
}

const buildGround = new Ground();

class EndGround {
  constructor() {
    this.x = 0;
    this.y = 330;
    this.w = CANVAS_WIDTH;
    this.h = 100;
    this.speed = 0.4;
  }

  draw() {
    ctx.drawImage(ground2, this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.speed;
  }
}

const buildEndGround = new EndGround();

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    buildGround.moveLeft();
  }

  if (event.key === 'ArrowRight') {
    buildGround.moveRight();
  }

  if (event.key === ' ') {
    gameStarted = !gameStarted;
    if (gameStarted) {
      scoreParagraph.style.color = 'white';
    }
  }
});

// Player
class Player {
  constructor() {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    this.radius = 20;
    this.speedX = 2;
    this.speedY = 2;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'salmon';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  detectWalls() {
    //   Left wall
    if (this.x - this.radius < 0) {
      this.speedX++;
    }

    //   Right wall
    if (this.x + this.radius > CANVAS_WIDTH) {
      this.speedX--;
    }

    //   Top wall
    if (this.y < 0 + this.radius) {
      this.speedY--;
    }

    //  Bottom wall
    // if (this.y + this.radius + 20 > canvas.height) {
    if (this.y + this.radius > canvas.height + this.radius) {
      gameOver = true;

      //   this.speedY++;
    }
  }

  detectCollisionBar = (paddleBar) => {
    let bottomOfBall = this.y + this.radius;
    let topOfBall = this.y - this.radius;

    // Hardcoded value due to complications on the ground image position
    let topOfObject = paddleBar.y + 80;
    let leftSideOfObject = paddleBar.x;
    let rightSideOfObject = paddleBar.x + paddleBar.w;
    let bottomOfObject = paddleBar.y + paddleBar.h;

    if (
      bottomOfBall >= topOfObject &&
      topOfBall <= bottomOfObject &&
      this.x >= leftSideOfObject &&
      this.x + this.radius <= rightSideOfObject
    ) {
      this.speedY++;
    }
  };

  update(bar) {
    this.detectWalls();
    this.detectCollisionBar(bar);
    this.y -= this.speedY;
    this.x += this.speedX;
  }
}

const player = new Player();

// ENEMIES
let enemiesArray = [];
let = moveUp = false;

class Enemies {
  constructor(image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.dx = 0.995;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  detectWalls() {
    //   Top wall
    if (this.y < 0) {
      this.y -= 10;

      //   GAME OVER
      gameOver = true;
    }
  }

  detectCollision = (player) => {
    let bottomOfBall = player.y + player.radius;
    let topOfBall = player.y - player.radius;

    let topOfObject = this.y;
    let leftSideOfObject = this.x;
    let rightSideOfObject = this.x + this.w;
    let bottomOfObject = this.y + this.h;

    if (
      bottomOfBall >= topOfObject &&
      topOfBall <= bottomOfObject &&
      player.x >= leftSideOfObject &&
      player.x + player.radius <= rightSideOfObject
    ) {
      return true;
    } else {
      return false;
    }
  };

  update() {
    // this.y -= 0.1;
    this.y -= gameLevel;
  }
}

for (let i = 0; i < 5; i++) {
  enemiesArray.push(new Enemies(enemy2, 138 * i, 330));
}

const handleEnemies = (player) => {
  enemiesArray.forEach((enemy) => {
    if (enemy) {
      enemy.draw();
      enemy.update();
      enemy.detectWalls();
    }
  });

  //   Make sure the touched enemy is removed and the others don't blink
  enemiesArray.forEach((enemy, index) => {
    if (enemy) {
      if (enemy.detectCollision(player)) {
        enemiesArray.splice(index, 1);
        score++;
        if (score < 5) {
          scoreSpan.innerHTML = score;
        } else if (score === 5) {
          scoreSpan.innerHTML = `${score} - You are a winner!`;
        }
      }
    }
  });

  if (enemiesArray.length === 0) {
    win = true;
  }
};

// Game Over
class GameOver {
  constructor(message, background, centralSpace) {
    this.message = message;
    this.background = background;
    this.centralSpace = centralSpace;
  }

  draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(
      this.message,
      CANVAS_WIDTH / this.centralSpace,
      CANVAS_HEIGHT / 2
    );
  }
}

const endOfGame = new GameOver('GAME OVER', 'black', 3);
const winGame = new GameOver('YOU WIN!', 'salmon', 2.5);

class Start {
  constructor() {}

  draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'orange';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(
      'PRESS SPACE KEY TO START',
      CANVAS_WIDTH / 6.5,
      CANVAS_HEIGHT / 2
    );
  }
}

const startGame = new Start();

const restartGame = () => {
  // Game will restart automatically after a few sec
  if (gameOver || win) {
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
};

const animation = () => {
  if (!gameStarted) {
    startGame.draw();
  } else {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layer1.draw();
    layer1.update();
    flyingImageHandler([cloudImage1, cloudImage2], 1);
    buildGround.draw();
    //  Enemies
    handleEnemies(player);
    player.draw();
    player.update(buildGround);
    //   player.detectCollisionBar(buildGround);
    buildGround.detectCollision(player);
    //   Build the clouds that goes away when we start the game
    buildEndGround.draw();
    buildEndGround.update();
    gameFrame += 1;
    gameOver && endOfGame.draw();
    win && winGame.draw();
    restartGame();
  }

  requestAnimationFrame(animation);
};

animation();
