class Enemies {
  constructor(image, x, y, ctx) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.dx = 0.996;
    this.ctx = ctx;
    this.gameOver = false;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  detectWalls() {
    //   Top wall
    if (this.y < 0) {
      this.y -= 10;

      //   GAME OVER
      this.gameOver = true;
    }
  }

  wallDetected() {
    return this.gameOver;
  }

  detectCollision = (player) => {
    let bottomOfBall = player.y + player.radius;
    let topOfBall = player.y - player.radius;

    let topOfObject = this.y;
    let leftSideOfObject = this.x;
    let rightSideOfObject = this.x + this.w;
    let bottomOfObject = this.y + this.h;

    if (
      bottomOfBall >= topOfObject &&
      topOfBall <= bottomOfObject &&
      player.x >= leftSideOfObject &&
      player.x + player.radius <= rightSideOfObject
    ) {
      return true;
    } else {
      return false;
    }
  };

  update(gameLevel) {
    this.y -= gameLevel;
  }
}

export default Enemies;
