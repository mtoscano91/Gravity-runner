class Obstacles {
  constructor() {
    this.height = random(20, 50);
    this.width = random(20, 50);
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
    fill("red");

    rect(this.x, this.y, this.width, this.height);
    console.log(this.checkCollision(game.player));
  }
}
class Coins extends Obstacles {
  constructor(x, y, diameter, imgs) {
    super(x, y);
    this.diameter = 15;
    this.height = 15;
    this.width = 15;
    this.imgs = [
      { src: loadImage("../w2d5/p5funLecture/assets/coins/tile000.png") },
      { src: loadImage("../w2d5/p5funLecture/assets/coins/tile001.png") },
      { src: loadImage("../w2d5/p5funLecture/assets/coins/tile002.png") },
      { src: loadImage("../w2d5/p5funLecture/assets/coins/tile003.png") },
      { src: loadImage("../w2d5/p5funLecture/assets/coins/tile004.png") },
    ];
  }

  display() {
    this.x--;
    this.imgs.forEach((element) => {
      image(element.src, this.x, this.y);
    });
  }
}
