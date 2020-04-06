class Player {
  constructor() {
    this.img = loadImage("../w2d5/p5funLecture/assets/player/run.gif");
    this.gravity = 0.03;
    this.gravityY = this.gravity;
    this.gravityX = 0;
    this.speedY = 0;
    this.speedX = 0;
    this.maxSpeed = 4;
  }

  setup() {
    this.height = this.img.height;
    this.width = this.img.width;
    this.x = 50;
    this.y = 100;
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
    image(this.img, this.x, this.y);
  }

  gravityUp() {
    ///Change gravityY and set gravity other axis to 0.
    this.gravityY = -this.gravity;
    this.gravityX = 0;
    //Change side from image
    this.img = loadImage("../w2d5/p5funLecture/assets/player/mid air.gif");
  }

  gravityDown() {
    this.gravityY = this.gravity;
    this.gravityX = 0;
    this.img = loadImage("../w2d5/p5funLecture/assets/player/run.gif");
  }

  gravityLeft() {
    this.gravityY = 0;
    this.gravityX = -this.gravity;
    //this.img = loadImage("#");
  }

  gravityRight() {
    this.gravityY = 0;
    this.gravityX = this.gravity;
    this.img = loadImage("../w2d5/p5funLecture/assets/player/run.gif");
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
