const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 400);
let gameFrame = 0;

// Images
const cloudImage1 = document.querySelector('#cloud1');
const cloudImage2 = document.querySelector('#cloud2');
const cloudImage3 = document.querySelector('#cloud3');
const birdImage1 = document.querySelector('#bird1');
const birdImage2 = document.querySelector('#bird2');
const birdImage3 = document.querySelector('#bird3');
const birdImage4 = document.querySelector('#bird4');

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

class CloudImage {
  constructor(cloudImg) {
    this.w = Math.floor(Math.random() * (70 - 50 + 1) + 50);
    this.h = Math.floor(Math.random() * (65 - 45 + 1) + 50);
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
const arrayCloudImages = [];

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

const cloudImageHandler = (images) => {
  // Make sure random images are displayed starting at index 0

  if (gameFrame % 350 === 0) {
    const image = Math.floor(Math.random() * (6 - 0 + 1)) + 0;

    console.log(image);

    arrayCloudImages.push(new CloudImage(images[image]));
  }

  arrayCloudImages.forEach((cloudItem) => {
    cloudItem.draw();
    cloudItem.update();
  });

  //   Check if the cloud has past the canvas border and removes it
  arrayCloudImages.forEach((cloudItem, index) => {
    if (cloudItem.x < -cloudItem.w) {
      arrayCloudImages.splice(index, 1);
    }
  });
};

const animation = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  treeHandler();
  cloudImageHandler([
    cloudImage1,
    cloudImage2,
    cloudImage3,
    bird1,
    bird2,
    bird3,
    bird4,
  ]);
  gameFrame += 1;
  requestAnimationFrame(animation);
};

animation();
