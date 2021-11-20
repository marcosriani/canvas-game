const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 400);
let gameFrame = 0;

// Images
const cloudImage1 = document.querySelector('#cloud1');
const cloudImage2 = document.querySelector('#cloud2');
const birdImage1 = document.querySelector('#bird1');
const birdImage2 = document.querySelector('#bird2');

class Tree {
  constructor(canvasW, canvasH) {
    this.w = Math.floor(Math.random() * (60 - 25 + 1) + 25);
    this.h = Math.floor(Math.random() * (250 - 45 + 1) + 45);
    this.speed = Math.random() * 10 + 1;
    this.x = canvasW;
    this.y = canvasH;
  }

  draw() {
    ctx.fillStyle = this.speed > 3 ? '#e25822' : 'rgba(135, 166, 245, 0.303)';
    ctx.fillRect(this.x, this.y - this.h, this.w, this.h);
  }

  update() {
    this.x -= this.speed;
  }
}

class FlyingImages {
  constructor(cloudImg, maxW, maxH, minW, minH) {
    this.w = Math.floor(Math.random() * (maxW - minW + 1) + minW);
    this.h = Math.floor(Math.random() * (maxH - minH + 1) + minH);
    this.speed = 1;
    this.x = 600;
    this.y = Math.floor(Math.random() * (150 - 0 + 1) + 0);
    this.cloudImg = cloudImg;
  }

  draw() {
    ctx.drawImage(this.cloudImg, this.x, this.y, this.w, this.h);
  }

  update() {
    this.x -= this.speed;
  }
}

const arrayOfTrees = [];
const arrayFlyingItems = [];

const treeHandler = () => {
  if (gameFrame % 50 === 0) {
    arrayOfTrees.push(new Tree(CANVAS_WIDTH, CANVAS_HEIGHT));
  }

  arrayOfTrees.forEach((treeItem) => {
    treeItem.draw();
    treeItem.update();
  });

  //   Check if the tree has past the canvas border and removes it
  arrayOfTrees.forEach((treeItem, index) => {
    if (treeItem.x < -treeItem.w) {
      arrayOfTrees.splice(index, 1);
    }
  });
};

const flyingImageHandler = (images, imageQuantity) => {
  // Make sure random images are displayed starting at index 0
  if (gameFrame % 350 === 0) {
    const image = Math.floor(Math.random() * (imageQuantity - 0 + 1)) + 0;

    // Make sure the bird images are never too big
    if (images[image].id === 'bird1' || images[image].id === 'bird2') {
      arrayFlyingItems.push(new FlyingImages(images[image], 30, 25, 15, 20));
    } else {
      console.log(images[image]);
      arrayFlyingItems.push(new FlyingImages(images[image], 70, 55, 50, 45));
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

const backgroundLayer1 = new Image();
let gameSpeed = 1;
backgroundLayer1.src = '../img/mid_ground_cloud_2.png';

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

const animation = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layer1.update();
  layer1.draw();
  treeHandler();
  flyingImageHandler([cloudImage1, cloudImage2, bird1, bird2], 3);
  gameFrame += 1;
  requestAnimationFrame(animation);
};

animation();
