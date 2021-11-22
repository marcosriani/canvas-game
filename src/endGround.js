class EndGround {
  constructor(CANVAS_WIDTH, ground2, ctx) {
    this.x = 0;
    this.y = 230;
    this.w = CANVAS_WIDTH;
    this.h = 100;
    this.speed = 0.4;
    this.ground2 = ground2;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.drawImage(this.ground2, this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.speed;
  }
}

export default EndGround;
