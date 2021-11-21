const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 400);
let gameFrame = 0;

// Images
const cloudImage1 = document.querySelector('#cloud1');
const cloudImage2 = document.querySelector('#cloud2');
const birdImage1 = document.querySelector('#bird1');
const birdImage2 = document.querySelector('#bird2');
const ground = document.querySelector('#ground');
const enemy1 = document.querySelector('#enemy1');
const enemy2 = document.querySelector('#enemy2');

class FlyingImages {
  constructor(cloudImg, maxW, maxH, minW, minH) {
    this.w = Math.floor(Math.random() * (maxW - minW + 1) + minW);
    this.h = Math.floor(Math.random() * (maxH - minH + 1) + minH);
    this.speed = Math.floor(Math.random() * (3 - 2 + 1) + 2);
    this.x = 600;
    this.y = Math.floor(Math.random() * (250 - 0 + 1) + 0);
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
  if (gameFrame % 350 === 0) {
    const image = Math.floor(Math.random() * (imageQuantity - 0 + 1)) + 0;

    // Make sure the bird images are never too big
    if (images[image].id === 'bird1' || images[image].id === 'bird2') {
      arrayFlyingItems.push(new FlyingImages(images[image], 40, 35, 15, 20));
    } else {
      arrayFlyingItems.push(new FlyingImages(images[image], 90, 75, 50, 45));
    }
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
    this.size = 200;
  }

  draw() {
    ctx.drawImage(ground, this.x, this.y, this.size, 100);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speedX;
    }
  }

  moveRight() {
    if (this.x < CANVAS_WIDTH - this.size) {
      this.x += this.speedX;
    }
  }

  update() {
    this.x;
  }
}

const buildGround = new Ground();

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    buildGround.moveLeft();
  }

  if (event.key === 'ArrowRight') {
    buildGround.moveRight();
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
    if (this.y + this.radius + 20 > canvas.height) {
      this.speedY++;
    }
  }

  update() {
    this.detectWalls();
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
    // this.distance;
    // this.hit = false;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  detectWalls() {
    //   Top wall
    if (this.y < 0) {
      this.y -= 10;

      //   GAME OVER
    }
  }

  detectCollision = (player) => {
    let bottomOfBall = player.y + player.radius;
    let topOfBall = player.y - player.radius;

    let topOfObject = this.y;
    let leftSideOfObject = this.x;
    let rightSideOfObject = this.x + this.w;
    let bottomOfObject = this.y + this.h;

    // if (topOfBall <= bottomOfObject) {
    //   console.log(bottomOfObject);
    //   console.log(topOfBall);
    // }

    if (
      bottomOfBall >= topOfObject &&
      topOfBall <= bottomOfObject &&
      player.x >= leftSideOfObject &&
      player.x + player.radius <= rightSideOfObject
    ) {
      console.log('hi');
      return true;
    } else {
      return false;
    }
  };

  update() {
    //   Makes sure the spaceship goes up slowly (Moves up and down, strong force to push up)
    moveUp = !moveUp;

    // if (moveUp) {
    //   //   this.y -= 2;
    //   this.y -= this.dx;
    // } else {
    //   this.y += 0.6;
    // }

    this.y -= 0.1;
  }
}

for (let i = 0; i < 5; i++) {
  enemiesArray.push(new Enemies(enemy2, 138 * i, 330));
}

const handleEnemies = (player) => {
  enemiesArray.forEach((enemy, index) => {
    if (enemy) {
      enemy.draw();
      enemy.update();
      enemy.detectWalls();

      //   console.log(enemiesArray.length);

      if (enemy.detectCollision(player)) {
        // console.log(enemiesArray.length);
        enemiesArray.splice(index, 1);
      }
    }
  });
};

const animation = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer1.draw();
  layer1.update();
  flyingImageHandler([cloudImage1, cloudImage2, bird1, bird2], 3);
  buildGround.draw();

  //  Enemies
  handleEnemies(player);

  player.draw();
  player.update();
  gameFrame += 1;
  requestAnimationFrame(animation);
};

animation();
