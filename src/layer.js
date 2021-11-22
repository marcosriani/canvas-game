class Layer {
  constructor(image, speedModifier, gameSpeed, ctx) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
    this.ctx = ctx;
  }

  update() {
    if (this.x <= -this.width) {
      this.x = 0;
    }

    this.x = this.x - this.speed;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export default Layer;
