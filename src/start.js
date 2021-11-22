class Start {
  constructor(CANVAS_WIDTH, CANVAS_HEIGHT, ctx) {
    this.canvasWidth = CANVAS_WIDTH;
    this.canvasHeight = CANVAS_HEIGHT;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = 'orange';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(
      'PRESS SPACE KEY TO START',
      this.canvasWidth / 14,
      this.canvasHeight / 2
    );
  }
}

export default Start;
