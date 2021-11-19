const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 400);
let gameFrame = 0;

class Tree {
  constructor(x) {
    this.color = 'red';
    this.w = Math.floor(Math.random() * (60 - 25 + 1) + 25);
    this.h = Math.floor(Math.random() * (350 - 45 + 1) + 45);
    this.x = x;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, CANVAS_HEIGHT - this.h, this.w, this.h);
  }

  update() {
    this.x--;
  }
}

const arrayOfTrees = [];

const treeHandler = () => {
  if (gameFrame % 50 === 0) {
    arrayOfTrees.push(new Tree(CANVAS_WIDTH));
  }

  arrayOfTrees.forEach((treeItem) => {
    treeItem.draw();
    treeItem.update();
  });
};

const animation = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  treeHandler();
  gameFrame++;
  requestAnimationFrame(animation);
};

animation();
