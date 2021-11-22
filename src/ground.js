class Ground {
  constructor(CANVAS_WIDTH, CANVAS_HEIGHT, ground, ctx) {
    this.x = 0;
    this.y = CANVAS_HEIGHT / 1.5;
    this.canvasWidth = CANVAS_WIDTH;
    this.speedX = 100;
    this.speedY = 100;
    this.w = 200;
    this.h = 100;
    this.ground = ground;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.drawImage(this.ground, this.x, this.y, this.w, this.h);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speedX;
    }
  }

  moveRight() {
    if (this.x < this.canvasWidth - this.w) {
      this.x += this.speedX;
    }
  }

  detectCollision = (player) => {
    if (
      player.y + player.radius === this.y + this.h &&
      player.x + player.radius <= this.x + this.w
    ) {
      return true;
    } else {
      return false;
    }
  };

  update() {
    this.x;
  }
}

export default Ground;
