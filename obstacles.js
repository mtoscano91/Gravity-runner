class Obstacles {
  constructor() {
    this.imgs = [
      { src: loadImage("./assets/asteroids/tile000.png") },
      { src: loadImage("./assets/asteroids/tile001.png") },
      { src: loadImage("./assets/asteroids/tile002.png") },
      { src: loadImage("./assets/asteroids/tile003.png") },
      { src: loadImage("./assets/asteroids/tile004.png") },
      { src: loadImage("./assets/asteroids/tile005.png") },
      { src: loadImage("./assets/asteroids/tile006.png") },
      { src: loadImage("./assets/asteroids/tile007.png") },
    ];
    this.index = Math.floor(Math.random() * this.imgs.length);
    this.height = 35; //this.imgs[0].src.height; I dont know why this isnt working
    this.width = 35; //this.imgs[0].src.width;

    this.x = width;
    this.y = random(0, height - this.height);
  }

  //CHEQUEAR Q LAS COLIISONES CON MONEDAS ME TOMAN LA WIDTH Y HEIGHT DEL RECT
  checkCollision(player) {
    let left = this.x;
    let right = this.x + this.width;
    let playerLeft = player.x;
    let playerRight = player.x + player.width;

    let top = this.y;
    let bottom = this.y + this.height;
    let playerTop = player.y;
    let playerBottom = player.y + player.height;

    let xCollision =
      (left < playerLeft && playerLeft < right) ||
      (playerRight > left && right > playerRight) ||
      (left > playerLeft && left < playerRight) ||
      (right > playerLeft && right < playerRight);

    let yCollision =
      (playerBottom < bottom && top < playerBottom) ||
      (playerTop < bottom && top < playerBottom) ||
      (top > playerTop && top < playerBottom) ||
      (bottom > playerTop && bottom < playerBottom);

    let collision = xCollision && yCollision;
    return collision;
  }

  display() {
    //Moving the OBSTACLE TO THE LEFT
    this.x--;
    image(this.imgs[this.index].src, this.x, this.y);
  }
}
class Coins extends Obstacles {
  constructor(x, y, imgs) {
    super(x, y, imgs);
    this.height = 15;
    this.width = 15;
    this.index = 0;
    this.imgs = [
      { src: loadImage("./assets/coins/tile000.png") },
      { src: loadImage("./assets/coins/tile001.png") },
      { src: loadImage("./assets/coins/tile002.png") },
      { src: loadImage("./assets/coins/tile003.png") },
      { src: loadImage("./assets/coins/tile004.png") },
    ];
  }

  display() {
    this.x--;
    if (frameCount % 10 === 0) {
      this.index++;
    }
    image(this.imgs[this.index % this.imgs.length].src, this.x, this.y);
  }
}

class Bullets extends Obstacles {
  constructor(x, y, img) {
    super(x, y);
    this.speed = 3;
    this.index = 0;
    this.imgs = [
      { src: loadImage("./assets/player/run.gif") },
      //{ src: loadImage("./assets/bullets/tile002.png") },
      //{ src: loadImage("./assets/bullets/tile003.png") },
    ];
    this.height = this.imgs[0].src.height;
    this.width = this.imgs[0].src.width;
  }

  display() {
    this.x -= this.speed;
    if (frameCount % 10 === 0) {
      this.index++;
    }
    image(this.imgs[this.index % this.imgs.length].src, this.x, this.y);
  }
}
