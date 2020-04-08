class Player {
  constructor() {
    this.imgs = {
      default: loadImage("./assets/astronaut/walking.png"),
      down: loadImage("./assets/astronaut/drag down.png"),
      up: loadImage("/assets/astronaut/drag up.png"),
      left: loadImage("/assets/astronaut/drag left.png"),
      right: loadImage("/assets/astronaut/drag right.png"),
    };

    this.gravity = 0.05;
    this.gravityY = this.gravity;
    this.gravityX = 0.01;
    this.speedY = 0;
    this.speedX = 0;
    this.maxSpeed = 4;
    this.index = 0;
    this.orientation = "default";
  }

  setup() {
    this.height = 50;
    this.width = 50;
    this.x = 50;
    this.y = 100;
  }

  displayImg(orientation) {
    image(this.imgs[orientation], this.x, this.y);
  }

  display() {
    ///Increase speed with gravity only if its not maxspeed
    this.speedX = this.speed(this.speedX, this.gravityX);
    this.speedY = this.speed(this.speedY, this.gravityY);

    /// Change position according to speed
    this.x += this.speedX;
    this.y += this.speedY;

    /// Stop at canvas limit
    if (this.y > height - this.height) {
      this.y = height - this.height;
      this.speedY = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.speedY = 0;
    }
    if (this.x > width - this.width) {
      this.x = width - this.width;
      this.speedX = 0;
    }
    if (this.x < 0) {
      this.x = 0;
      this.speedX = 0;
    }

    ///Display image in canvas
    this.displayImg(this.orientation);
  }

  gravityUp() {
    ///Change gravityY and set gravity other axis to 0.
    this.gravityY = -this.gravity;
    this.gravityX = 0;
    //Rotate image
    this.orientation = "up";
  }

  gravityDown() {
    this.gravityY = this.gravity;
    this.gravityX = 0;
    this.orientation = "down";
  }

  gravityLeft() {
    this.gravityY = 0;
    this.gravityX = -this.gravity;
    this.orientation = "left";
  }

  gravityRight() {
    this.gravityY = 0;
    this.gravityX = this.gravity;
    this.orientation = "right";
  }

  speed(speed, gravity) {
    if (
      Math.abs(speed) < this.maxSpeed ||
      (speed > 0 && gravity < 0) ||
      (speed < 0 && gravity > 0)
    )
      speed += gravity;
    return speed;
  }
}
