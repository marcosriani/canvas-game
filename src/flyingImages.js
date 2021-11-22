class FlyingImages {
  constructor(cloudImg, maxW, maxH, minW, minH, CANVAS_WIDTH, ctx) {
    this.w = Math.floor(Math.random() * (maxW - minW + 1) + minW);
    this.h = Math.floor(Math.random() * (maxH - minH + 1) + minH);
    this.speed = Math.floor(Math.random() * (3 - 2 + 1) + 2);
    this.x = CANVAS_WIDTH;
    this.y = Math.floor(Math.random() * (300 - 0 + 1) + 0);
    this.cloudImg = cloudImg;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.drawImage(this.cloudImg, this.x, this.y, this.w, this.h);
  }

  update() {
    this.x -= this.speed;
  }
}

export default FlyingImages;
