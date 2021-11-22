class Player {
  constructor(CANVAS_WIDTH, CANVAS_HEIGHT, ctx) {
    this.x = CANVAS_WIDTH / 2;
    this.y = CANVAS_HEIGHT / 2;
    this.radius = 20;
    this.speedX = 2;
    this.speedY = 2;
    this.canvasWidth = CANVAS_WIDTH;
    this.ctx = ctx;
    this.gameOver = false;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'salmon';
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  detectWalls() {
    //   Left wall
    if (this.x - this.radius < 0) {
      this.speedX++;
    }

    //   Right wall
    if (this.x + this.radius > this.canvasWidth) {
      this.speedX--;
    }

    //   Top wall
    if (this.y < 0 + this.radius) {
      this.speedY--;
    }

    //  Bottom wall
    if (this.y + this.radius > canvas.height + this.radius) {
      this.gameOver = true;
    }
  }

  detectEndOfGame() {
    return this.gameOver;
  }

  detectCollisionBar = (paddleBar) => {
    let bottomOfBall = this.y + this.radius;
    let topOfBall = this.y - this.radius;

    // Hardcoded value due to complications on the ground image position
    let topOfObject = paddleBar.y + 77;
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

export default Player;
