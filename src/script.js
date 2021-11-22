const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 300);

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

// Controls for the game level
radioButtonLevel1.addEventListener('click', () => {
  gameLevel = radioButtonLevel1.value;
});
radioButtonLevel2.addEventListener('click', () => {
  gameLevel = radioButtonLevel2.value;
});
radioButtonLevel3.addEventListener('click', () => {
  gameLevel = radioButtonLevel3.value;
});

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

// Audio
const spaceshipFlying = document.createElement('audio');
spaceshipFlying.src = '../audio/mixkit-explosion-hit-1704.wav';

const audioBackground = document.createElement('audio');
audioBackground.src = '../audio/PM_FSSF_AMBIENCE_SOUNDSCAPE_LOOP_3.mp3';

const explosionAudio = document.createElement('audio');
explosionAudio.src =
  '../audio/esm_8bit_explosion_bomb_boom_blast_cannon_retro_old_school_classic_cartoon.mp3';

//   Importing classes
import FlyingImages from './flyingImages.js';
import Layer from './layer.js';
import Ground from './Ground.js';
import EndGround from './EndGround.js';
import Player from './Player.js';
import Enemies from './enemies.js';
import GameOver from './GameOver.js';
import Start from './Start.js';

// FLYING CLOUDS
const arrayFlyingItems = [];

const flyingImageHandler = (images, imageQuantity) => {
  // Make sure random images are displayed starting at index 0
  if (gameFrame % 100 === 0) {
    const image = Math.floor(Math.random() * (imageQuantity - 0 + 1)) + 0;
    arrayFlyingItems.push(
      new FlyingImages(images[image], 100, 90, 50, 45, CANVAS_WIDTH, ctx)
    );
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

const layer1 = new Layer(backgroundLayer1, 0.5, gameSpeed, ctx);

// BACKGROUND GROUND - PADDLE
const buildGround = new Ground(CANVAS_WIDTH, CANVAS_HEIGHT, ground, ctx);

// CLOUDS THAT SHOW WHEN THE GAME STARTS
const buildEndGround = new EndGround(CANVAS_WIDTH, ground2, ctx);

// PLAYER KICKING BALL
const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, ctx);

// ENEMIES
let enemiesArray = [];

for (let i = 0; i < 5; i++) {
  enemiesArray.push(new Enemies(enemy2, 111 * i, 230, ctx));
}

const handleEnemies = (player) => {
  enemiesArray.forEach((enemy) => {
    if (enemy) {
      enemy.draw();
      enemy.update(gameLevel);
      enemy.detectWalls();
      gameOver = enemy.wallDetected();
    }
  });

  //   Make sure the touched enemy is removed and the others don't blink
  enemiesArray.forEach((enemy, index) => {
    if (enemy) {
      if (enemy.detectCollision(player)) {
        explosionAudio.play();
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

const endOfGame = new GameOver(
  'GAME OVER',
  'black',
  3,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ctx
);
const winGame = new GameOver(
  'YOU WIN!',
  'salmon',
  3,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  ctx
);

const startGame = new Start(CANVAS_WIDTH, CANVAS_HEIGHT, ctx);

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
    gameOver = player.detectEndOfGame();
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

// EVENT LISTENERS
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    buildGround.moveLeft();
  }

  if (event.key === 'ArrowRight') {
    buildGround.moveRight();
  }

  if (event.key === ' ') {
    if (!gameOver) {
      gameStarted = !gameStarted;

      if (gameStarted) {
        scoreParagraph.style.color = 'white';
        spaceshipFlying.play();
        audioBackground.play();
      }
    }
  }
});

animation();
