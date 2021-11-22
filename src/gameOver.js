class GameOver {
  constructor(
    message,
    background,
    centralSpace,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    ctx
  ) {
    this.message = message;
    this.background = background;
    this.centralSpace = centralSpace;
    this.canvasWidth = CANVAS_WIDTH;
    this.canvasHeight = CANVAS_HEIGHT;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(
      this.message,
      this.canvasWidth / this.centralSpace,
      this.canvasHeight / 2
    );
  }
}

export default GameOver;
