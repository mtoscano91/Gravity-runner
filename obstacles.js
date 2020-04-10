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
    this.speed = 1 * (1 + game.level / 2);
    this.x = width;
    this.y = random(0, height - this.height);
  }

  //CHEQUEAR Q LAS COLIISONES CON MONEDAS ME TOMAN LA WIDTH Y HEIGHT DEL FONDO
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
    this.x -= this.speed;
    image(this.imgs[this.index].src, this.x, this.y);
  }
}
class Pills extends Obstacles {
  constructor(x, y, imgs) {
    super(x, y, imgs);
    this.height = 15;
    this.width = 15;
    this.speed = 1 * (1 + game.level / 2);
    this.imgs = [
      { src: loadImage("./assets/Pills/pill_1.png") },
      { src: loadImage("./assets/Pills/pills_2.png") },
    ];
    this.index = Math.floor(Math.random() * this.imgs.length);
  }

  display() {
    this.x -= this.speed;
    image(this.imgs[this.index].src, this.x, this.y);
  }
}

class Comets extends Obstacles {
  constructor(x, y, img) {
    super(x, y);
    this.speed = 3 * (1 + game.level / 4);
    this.index = 0;
    this.imgs = [
      { src: loadImage("./assets/glitch_meteor/meteor0001.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0002.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0003.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0004.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0005.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0006.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0007.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0008.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0009.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0010.png") },
      { src: loadImage("./assets/glitch_meteor/meteor0011.png") },
    ];
    this.height = 37; //this.imgs[0].src.height;
    this.width = 37; //this.imgs[0].src.width;
  }

  display() {
    this.x -= this.speed;
    if (frameCount % 10 === 0) {
      this.index++;
    }
    image(this.imgs[this.index % this.imgs.length].src, this.x, this.y);
  }
}
